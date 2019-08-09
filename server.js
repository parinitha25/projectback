var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
// const routes = require('./api/routes/UserRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tax-financial');

UserData = require('./api/models/userModel');


var routes = require('./api/routes/UserRoutes'); 
routes(app);


app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), function(){
console.log('Server started on port ' + app.get('port'));
});
