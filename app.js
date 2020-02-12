const express        = require('express');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const connectDB      = require('./config/db');
                    //    require("dotenv").config();

const app = express();

// connect DB
connectDB();

// Schemas for DB
var Blog           = require('./models/blog'); 

// requiring routes
var indexRoutes   = require('./routes/index');
var blogRoutes    = require('./routes/blog');
var movie01Routes = require('./routes/movie01');

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
app.listen(process.env.PORT || 3000, function(){
    console.log('SERVER IS RUNNING!');
});