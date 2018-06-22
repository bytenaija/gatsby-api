const express = require('express');
const logger = require('morgan');
const UserRoutes = require("./src/routes/user.routes");
const RestaurantRoutes = require("./src/routes/restaurant.routes");
const AdminRoutes = require("./src/routes/admin.routes");
const models = require('./src/models');
const enforce = require('express-sslify');

// Set up the express app
const app = express();
if (app.get('env') !== 'development') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
}



// Log requests to the //console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", UserRoutes);
app.use("/admin", AdminRoutes);
app.use("/restaurant", RestaurantRoutes);

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
// Setup a default catch-all route that sends back a welcome message in JSON format.


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
/* app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500);
    res.json(err);
}); */

var port = process.env.PORT || 8000;
console.log("Port ", port);
models.sequelize.sync().then(() => {
    app.listen(port, () => console.log("Listening on port " + port));
})