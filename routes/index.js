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

// ABOUT ROUTE
router.get('/home/about', function(req, res){
    res.render('about');
});

// API ROUTE
router.get('/api', function (req, res) {
    res.render('api');
});

// to display resume for people to see and download
router.get('/resume', function (req, res) {
    var resume = 'public/Website-Resume.pdf';
    fs.readFile(resume, function (err, data) {
        res.contentType('application/pdf');
        res.send(data);
    });
});

module.exports = router;