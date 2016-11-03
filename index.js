/**
 This file is part of CORS Fix.

 CORS Fix is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 CORS Fix is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with CORS Fix.  If not, see <http://www.gnu.org/licenses/>.
 */

var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// So that CORS is supported
app.use(cors());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// ROUTES FOR OUR API
// =============================================================================
// get an instance of the express Router
var router = express.Router();

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

router.get('/', function(req, res, next) {
  res.render('pages/index');
});

// Use the router for all routing...
app.use('/', router);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    route.controller(app);
  }
});

// Set the port
var port = process.env.PORT || 8080;

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


