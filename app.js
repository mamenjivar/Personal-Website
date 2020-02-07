var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var request        = require('request');
var fs             = require('fs');

                     require('dotenv').config();

// Schemas for DB
var Blog           = require('./models/blog'); 

// requiring routes
var indexRoutes   = require('./routes/index');
var blogRoutes    = require('./routes/blog');
var movie01Routes = require('./routes/movie01');

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

// activate routes used in new folders
app.use(indexRoutes);
app.use(blogRoutes);
app.use(movie01Routes);

// MANUALLY PUSH A NEW BLOG TO POPULATE DB
// Blog.create({
//     title: 'Test Blog',
//     author: 'Miggsception',
//     body: 'THIS IS THE FIRST POST TO TEST LOCAL DB WORKS' 
// });

// LOCALHOST
app.listen(3000, function(){
    console.log('SERVER IS RUNNING!');
});