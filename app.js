var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var request        = require('request');
var fs             = require('fs');

                     require('dotenv').config();

var Blog           = require('./models/blog'); // schema moved to its own page

// connect mongoose with database
mongoose.connect('mongodb://localhost/personal-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// MANUALLY PUSH A NEW BLOG TO POPULATE DB
// Blog.create({
//     title: 'Test Blog',
//     author: 'Miggsception',
//     body: 'THIS IS THE FIRST POST TO TEST LOCAL DB WORKS' 
// });

// ROOT ROUTE
app.get('/', function(req, res){
    res.render('home');
});

// INDEX (HOME) ROUTE
app.get('/home', function(req, res){
    res.render('home');
});

// API ROUTE
app.get('/api', function(req, res){
    res.render('api');
});

app.get('/resume', function(req, res){
    var resume = 'public/Website-Resume.pdf';
    fs.readFile(resume, function(err, data){
        res.contentType('application/pdf');
        res.send(data);
    });
});

/////////////////////////// MOVIE API ROUTES
app.get('/api/movieapi', function(req, res){
    res.render('movie01/movieapi');
});

// MOVIE RESULT ROUTE
app.get('/api/movieapi/result', function(req, res){
    var query = req.query.search;
    var url = 'http://omdbapi.com/?s=' + query + process.env.MOVIE_DB;

    request(url, function(err, response, body){
        if(!err && response.statusCode == 200){
            var data = JSON.parse(body);
            // console.log(JSON.parse(body));
            res.render('movie01/result', {
                data: data,
                movieName: query
            });
        }
    });
});

/////////////////// BLOG ROUTES

// BLOG ROUTE
app.get('/blog', function(req, res){
    Blog.find({}, function(err, blog){
        if(err){
            console.log('ERROR!');
        } else {
            res.render('blog/blog', {blog: blog});
        }
    });
});

// when you hit submit on the form
// CREATE ROUTE (new post)
app.post('/blog', function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('blog/new');
        } else{
            res.redirect('blog');
        }
    });
});

// NEW ROUTE
app.get('/blog/new', function(req, res){
    res.render('blog/new');
});

// SHOW ROUTE
app.get('/blog/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blog');
        } else {
            res.render('blog/show', {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get('/blog/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blog');
        } else {
            res.render('blog/edit', {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put('/blog/:id', function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blog');
        } else {
            res.redirect('/blog/' + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete('/blog/:id', function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/blog');
        } else {
            res.redirect('/blog');
        }
    });
});

// LOCALHOST
app.listen(3000, function(){
    console.log('SERVER IS RUNNING!');
});