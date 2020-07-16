const express = require('express')
const router = express.Router()
const Supplier = require('../../models/supplier/supplier_model.js');

 

router.get('/',async (req,res) => {
   const suppliers =await  Supplier.find()
    res.render('../views/supplier/supplier',{suppliers:suppliers})
})

router.get('/new',(req,res) => {
    res.render('supplier/new',{supplier:new Supplier(),messages:""})
})

router.get('/:slug',async (req,res) => {
    const supplier = await Supplier.findOne({slug:req.params.slug});
    if(supplier == null) res.redirect('/');
    res.render('supplier/show',{supplier:supplier});
})

router.post('/', async (req,res) => {
    const supplier = new Supplier({
        name:req.body.name,
        address:req.body.address,
    })
    try{
        const checkSupplier = await Supplier.findOne({name:supplier.name});
        if(checkSupplier != null){ 
            res.render('supplier/new',{supplier:supplier,messages:'Entered supplier name is duplicated'})
        }
        else{
            const newSupplier = await supplier.save();
            res.redirect(`supplier/${newSupplier.slug}`);
        }
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;