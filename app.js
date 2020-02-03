var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');

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

// MONGOOSE SCHEMA - DATABASE FORMAT
var blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model('Blog', blogSchema);

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

/////////////////// BLOG ROUTES

// BLOG ROUTE
app.get('/blog', function(req, res){
    Blog.find({}, function(err, blog){
        if(err){
            console.log('ERROR!');
        } else {
            res.render('blog', {blog: blog});
        }
    });
});

// when you hit submit on the form
// CREATE ROUTE (new post)
app.post('/blog', function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('new');
        } else{
            res.redirect('/blog');
        }
    });
});

// NEW ROUTE
app.get('/blog/new', function(req, res){
    res.render('new');
});

// SHOW ROUTE
app.get('/blog/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blog');
        } else {
            res.render('show', {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get('/blog/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blog');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put('/blog/:id', function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blog');
        } else {
            res.redirect('/blog' + req.params.id);
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