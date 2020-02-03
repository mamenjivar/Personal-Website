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

// LOCALHOST
app.listen(3000, function(){
    console.log('SERVER IS RUNNING!');
});