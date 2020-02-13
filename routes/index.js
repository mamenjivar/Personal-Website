const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('file-system');

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

// GITHUB ROUTE
// one user only
router.get('/api/github', function(req, res){
    try {
        const options = {
            uri: encodeURI(`https://api.github.com/users/mamenjivar/repos?per_page=5&sort=created:asc`),
            method: 'GET',
            headers: {
                'user-agent': 'node.js',
                // Authorization: `token ` + process.env.GITHUB_TOKEN
                Authorization: `token ${process.env.GITHUB_TOKEN}`
            }
        };
        
        request(options, function(error, response, body){
            if(error) {
                console.error(error);
            }
            if (response.statusCode != 200){
                return res.status(404).json({ msg: 'Github profile not found' });
            }

            var data = JSON.parse(body);

            res.render('github', {
                gitData: data 
            });
        });
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error (github)');
    }

    // res.render('github');
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