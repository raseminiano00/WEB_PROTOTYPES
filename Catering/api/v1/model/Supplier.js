const mongoose = require('mongoose');

const slugify = require('slugify');
const SupplierSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique : true,
    },
    address:{
        type: String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique : true,
    }
})
SupplierSchema.pre('validate',function(next){
    if(this.name){
        this.slug=slugify(this.name,{lower:true,strict:true})
    }
    next();
})

SupplierSchema.pre('update',function(next){
    const data = this.getUpdate();
    if(data.name){
        this.slug=slugify(data.name,{lower:true,strict:true})
    }
    next();
})
module.exports = mongoose.model('Supplier',SupplierSchema);