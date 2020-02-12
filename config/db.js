// CONNECT TO DB
const mongoose = require('mongoose');
                 require("dotenv").config();

const connectDB = async function() {
    try{
        await mongoose.connect('mongodb+srv://' + process.env.MONGODB_ATLAS + '@personal-blog-4odat.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected... ');
    } catch(err){
        console.log(err.message);
        
        // EXIT PROGCESS WITH FAILURE IF  DB DOESN'T CONNECT
        process.exit(1);
    }
}

module.exports = connectDB;