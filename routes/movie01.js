var express = require('express');
var router = express.Router();
var request = require('request');

/////////////////////////// MOVIE API ROUTES
router.get('/api/movieapi', function (req, res) {
    res.render('movie01/movieapi');
});

// MOVIE RESULT ROUTE
router.get('/api/movieapi/result', function (req, res) {
    var query = req.query.search;
    var url = 'http://omdbapi.com/?s=' + query + process.env.MOVIE_DB;

    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            // console.log(JSON.parse(body));
            res.render('movie01/result', {
                data: data,
                movieName: query
            });
        }
    });
});

module.exports = router;