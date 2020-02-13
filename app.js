const express        = require('express');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const connectDB      = require('./config/db');

const app = express();

// connect DB
connectDB();

// requiring routes
const indexRoutes   = require('./routes/index');
const blogRoutes    = require('./routes/blog');
const movie01Routes = require('./routes/movie01');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// activate routes used in new folders
app.use(indexRoutes);
app.use(blogRoutes);
app.use(movie01Routes);

// LOCALHOST
app.listen(process.env.PORT || 3000, function(){
    console.log('SERVER IS RUNNING!');
});