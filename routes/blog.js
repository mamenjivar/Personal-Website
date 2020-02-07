var express = require('express');
var router = express.Router();

var Blog = require('../models/blog');

/////////////////// BLOG ROUTES

// BLOG ROUTE
router.get('/blog', function (req, res) {
    Blog.find({}, function (err, blog) {
        if (err) {
            console.log('ERROR!');
        } else {
            res.render('blog/blog', { blog: blog });
        }
    });
});

// when you hit submit on the form
// CREATE ROUTE (new post)
router.post('/blog', function (req, res) {
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render('blog/new');
        } else {
            res.redirect('blog');
        }
    });
});

// NEW ROUTE
router.get('/blog/new', function (req, res) {
    res.render('blog/new');
});

// SHOW ROUTE
router.get('/blog/:id', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/blog');
        } else {
            res.render('blog/show', { blog: foundBlog });
        }
    });
});

// EDIT ROUTE
router.get('/blog/:id/edit', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/blog');
        } else {
            res.render('blog/edit', { blog: foundBlog });
        }
    });
});

// UPDATE ROUTE
router.put('/blog/:id', function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            res.redirect('/blog');
        } else {
            res.redirect('/blog/' + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete('/blog/:id', function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/blog');
        } else {
            res.redirect('/blog');
        }
    });
});

module.exports = router;