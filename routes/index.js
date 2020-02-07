var express = require('express');
var router = express.Router();
var fs = require('file-system');

// ROOT ROUTE
router.get('/', function (req, res) {
    res.render('home');
});

// INDEX (HOME) ROUTE
router.get('/home', function (req, res) {
    res.render('home');
});

// API ROUTE
router.get('/api', function (req, res) {
    res.render('api');
});

router.get('/resume', function (req, res) {
    var resume = 'public/Website-Resume.pdf';
    fs.readFile(resume, function (err, data) {
        res.contentType('application/pdf');
        res.send(data);
    });
});

module.exports = router;