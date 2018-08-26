import 'babel-core/register'
import 'babel-polyfill'

import graphqlHTTP from 'express-graphql'

import { schema as RelaySchema } from './graph/relay/schema'
import { schema as SimpleSchema } from './graph/simple/schema'

import verify from './jwt/verify'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'

import UserRoutes from './routes/user.routes'
import RestaurantRoutes from './routes/restaurant.routes'
import AdminRoutes from './routes/admin.routes'
import ProductRoutes from './routes/product.routes'
import PlaceRoutes from './routes/place.routes'
import models from './models'

import { connectionHelper } from './graph/relay/helpers'
import { formatError } from 'apollo-errors'

import { HTTPS } from 'express-sslify'
import path from 'path';

const app = express()
if (app.get('env') !== 'development') {
    app.use(HTTPS({ trustProtoHeader: true }))
}

var corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://foodgatsby.com',
        'https://foodgatsby.com'
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['ACCEPT', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Content-Type', 'Set-Cookie'],
    credentials: true
}

// app.use(cors(corsOptions))
app.options(cors())
app.use(logger('dev'))

// app.use(function(req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // Request methods you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   )
//   // Request headers you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With, content-type, Authorization, Content-Type'
//   )
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   // Pass to next layer of middleware
//   next()
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', UserRoutes)
app.use('/admin', AdminRoutes)
app.use('/restaurant', RestaurantRoutes)
app.use('/product', ProductRoutes)
app.use('/place', PlaceRoutes)

app.use('/relay', (req, res, next) => {
    verify.verifyToken(req, res, next)
})

app.use(express.static(path.join('..', 'docs')));

app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/../docs/index.html`)
})
app.use('/relay', (req, res, next) => {
    const verification = verify.verify(req, res, next)

    if (verification) {
        req.user = models.user.findById(verification.id)
    }
    next()
        // else {
        //   res.status(401).json({
        //     //unauthorized token
        //     message: 'You are not authorized'
        //   })
        // }
})

app.use(
    '/graph',
    graphqlHTTP(req => ({
        schema: SimpleSchema,
        graphiql: true,
        context: {
            currentUser: req.user
        },
        formatError
    }))
)

app.use(
    '/relay',
    graphqlHTTP(req => ({
        schema: RelaySchema,
        graphiql: true,
        context: {
            currentUser: req.user,
            edgeFunction: connectionHelper
        },
        formatError
    }))
)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500);
    res.json(err)
})

var port = process.env.PORT || 8000
console.log('Port ', port)
models.sequelize.sync().then(() => {
    app.listen(port, () => console.log('Listening on port ' + port))
})