import { GraphSchema } from './graph/GraphSchema'
import { graphql } from 'graphql'
import graphqlHTTP from 'express-graphql'

require('babel-core/register')
require('babel-polyfill')

const express = require('express')
const logger = require('morgan')
const UserRoutes = require('./routes/user.routes')
const RestaurantRoutes = require('./routes/restaurant.routes')
const AdminRoutes = require('./routes/admin.routes')
const models = require('./models')

// Set up the express app
const app = express()

// Log requests to the //console.
app.use(logger('dev'))

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', UserRoutes)
app.use('/admin', AdminRoutes)
app.use('/restaurant', RestaurantRoutes)

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization, Content-Type'
  )
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})
// Setup a default catch-all route that sends back a welcome message in JSON format.

app.use(
  '/graph',
  graphqlHTTP(req => ({
    schema: GraphSchema,
    graphiql: true
  }))
)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
/* app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500);
    res.json(err);
}); */

var port = process.env.PORT || 8000
console.log('Port ', port)
models.sequelize.sync().then(() => {
  app.listen(port, () => console.log('Listening on port ' + port))
})
