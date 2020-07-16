const express = require('express');
const app = express();
const cors = require('cors');
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const supplierRoutes = require('./api/v1/routes/supplier/supplier');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/supplier',supplierRoutes);

app.get('/',(req,res)=>{
    res.send("<h1>Api works but please specify specific request</h1>");
});


mongoose.connect("mongodb+srv://billiejean07:billiejean07@prototype.qr2cw.mongodb.net/Catering_App?retryWrites=true&w=majority",
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true, useCreateIndex: true
}
,() => {
    console.log('connected')
});
app.listen(3000);