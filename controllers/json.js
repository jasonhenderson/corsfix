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

 Created by jasonhenderson on 5/4/16.
 */
var rest = require('restler');

module.exports.controller = function(app) {
    app.route('/fix')
        .get(function (req, res) {

            // Query string parameter "url" which is the complete URL we want to re-route
            var url = req.query.url;

            // Initialize options
            var options = undefined;

            // If "headers" parameter is provided, add it (in case we are authenticating)
            if (req.query.headers) {
                if (!options) options = {};
                if (!options.headers) options.headers = {};
                options["headers"] = req.query.headers;
            }

            rest.get(url, options).on('complete', function (data) {
                console.log(data);

                if (Buffer.isBuffer(data)) {
                    data = data.toString('utf8');
                }

                // Returns what is requested, either json or jsonp
                res.jsonp(data);
            });
        })
        .post(function (req, res) {

            // Query string parameter "url" which is the complete URL we want to re-route
            console.log('starting posting');

            var url = req.query.url;

            // Initialize options
            var options = undefined;

            // If "headers" parameter is provided, add it (in case we are authenticating)
            if (req.query.headers) {
                console.log('headers: ' + req.query.headers);
                if (!options) options = {};
                if (!options.headers) options.headers = {};
                options["headers"] = req.query.headers;
            }
            else {
                console.log('no headers');
            }

            if (req.body) {
                console.log('body: ' + req.body);
                if (!options) options = {};
                options["data"] = req.body;
            }
            else {
                console.log('no body');
            }

            console.log('posting');

            rest.post(url, options).on('complete', function (data, response) {
                console.log(JSON.stringify(response.headers));

                //if (Buffer.isBuffer(data)) {
                //    data = data.toString('utf8');
                //}

                console.log('returning from post');
                // Returns what is requested, either json or jsonp
                res.jsonp(data);
            });
        });
}