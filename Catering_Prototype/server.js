const express = require('express')

const flash = require('express-flash')
const session = require('express-session');
const connectFlash = require('connect-flash');
const app = express()


const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const supplierRoutes = require('./routes/supplier/supplier');
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized :false
}));
app.use(connectFlash());
app.get('/',(req,res) => {
    res.send("Catering App");
});

app.use('/supplier',supplierRoutes);



mongoose.connect("mongodb+srv://billiejean07:billiejean07@prototype.qr2cw.mongodb.net/Catering_App?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true }
,() => {
    console.log('connected')
});
app.listen(4000);