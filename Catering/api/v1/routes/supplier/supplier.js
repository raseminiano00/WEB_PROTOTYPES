const express = require('express');
const router = express.Router();
const Supplier = require('../../model/Supplier');


var IsSupplierExists = async (supplier) => await Supplier.findOne({name:supplier.name}) != null;

var getSupplierBySlug = async (supplierSlug) =>  await Supplier.findOne({slug:supplierSlug});

var createSupplierFromRequest = (req)=>{
    return new Supplier({
        name : req.name,
        address : req.address
    });
};

router.get('/',async (req,res) => {
    const suppliers =await  Supplier.find();
    await res.json(suppliers);
 })

router.get('/:slug',async (req,res) => {
    const suppliers =await  getSupplierBySlug(req.params.slug);
    await res.json(suppliers);
})


router.put('/:slug',async(req,res) =>{
    console.log('put request');
    const supplier = createSupplierFromRequest(req.body);
    try{
        console.log(req.body);
        if(await IsSupplierExists(supplier) == true && 
            req.body.oldName != supplier.name){ 
            res.status(422);
            await res.json({
                responseMessage : "supplier-name-duplicate"
            });
        }
        else{
            const filter = { name: 'Jean-Luc Picard' };
            const update = { age: 59 };
            const updatedSupplier = await Supplier.findOneAndUpdate({slug:req.params.slug},{name:supplier.name,address:supplier.address},{
                new: true
            });
            await res.json({ 
                updatedSupplier,
                responseMessage:"update-sucess"
            });
        }
    }catch(e){
        res.json(e);
    }
});
router.post('/',async (req,res) => {
    
    console.log('post request');
    console.log(req.body);
    const supplier = createSupplierFromRequest(req.body);
    try{
        if(await IsSupplierExists(supplier) == true){ 
            console.log('post request2');
            res.status(422);
            await res.send({
                responseMessage : "supplier-name-duplicate"
            });
            console.log(res);
        }
        else{
            
            const newSupplier = await supplier.save();
            await res.json({
                newSupplier,
                responseMessage:"add-success"
            });
        }
    }
    catch(e){
        res.json(e);
    }
})
 module.exports = router;