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
            var options = {};
            options.headers = {};

            // If "headers" query string parameter is provided, add it (in case we are authenticating)
            // DO NOT just take the headers submitted to this page...they may be off
            if (req.query.headers) {
                options["headers"] = req.query.headers;
            }

            // Always override the user agent to look like a browser
            options.headers["User-Agent"] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36";

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
            var url = req.query.url;

            // Initialize options
            var options = {};
            options.headers = {};

            // If "headers" parameter is provided, add it (in case we are authenticating)
            if (req.query.headers) {
                options["headers"] = req.query.headers;
            }

            // Always override the user agent to look like a browser
            options.headers["User-Agent"] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36";

            // Set the body
            if (req.body) {
                if (!options) options = {};
                options["data"] = req.body;
            }

            console.log('posting');

            rest.post(url, options).on('complete', function (data, response) {
                //if (Buffer.isBuffer(data)) {
                //    data = data.toString('utf8');
                //}

                console.log('returning from post');
                // Returns what is requested, either json or jsonp
                res.jsonp(data);
            });
        });
}