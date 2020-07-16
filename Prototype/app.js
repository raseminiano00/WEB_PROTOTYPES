const express = require('express');
const app = express();
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
require('dotenv/config');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import ROUTES
const postsRoute = require('./routes/posts.js');
app.use('/posts',postsRoute);


//ROUTES

app.get('/',(req,res) => {
    res.send("You are on home");
});

//CONNECTION TO DB
mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true,useUnifiedTopology: true }
,() => {
    console.log('connected')
});

//LISTEN
app.listen(3000);