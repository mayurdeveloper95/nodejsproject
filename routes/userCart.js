let express=require("express");
let router=express.Router();
let product=require("../schema/productSchema");
let usercart=require("../schema/userCartSchema");
let auth=require("../middleware/auth");
let userreg=require("../schema/userRegistrationSchema");
let Fawn=require('fawn');
let mongoose=require("mongoose");

router.post("/addtocart/:productsId",auth,async(req,res)=>{
try{
let {error}=usercart.validationError(req.body);
if(error){return res.status(403).send(error.details[0].message)};
let uid= await userreg.UserModel.findById(req.userRegistrationSchema._id).select("UserLogin.userEmail");
let productdata=await product.ProductModel.findById(req.params.productsId);
if(!productdata){return res.status(402).send({message:"product id not found"})};


let addcart=await usercart.CartModel({
    userEmail:uid.UserLogin.userEmail,
    products:
    {
        _id:productdata._id,
        name:productdata.name,
        image:productdata.image,
        description:productdata.description,
        price:productdata.price,
        quantity:productdata.quantity,
        offerPrice:productdata.offerPrice,
        isAvailable:productdata.isAvailable,
        isTodayOffer:productdata.isTodayOffer,
        category:{
            _id:productdata.category._id,
            categoryName:productdata.category.categoryName,
        },
        isAdmin:productdata.isAdmin
    },
  userquantity:req.body.userquantity
  
});


new Fawn.Task()
                .update("products",{_id:productdata._id},{
                    $inc:{
                        quantity:-req.body.userquantity
                    }
                })
                .run(); 

              
                let checkoutcart=await addcart.save();

/*
let carditem=await usercart.CheckoutModel({
    userEmail:uid.UserLogin.userEmail,
    cartItems:savecart
});

let checkoutcart= await carditem.save();
*/

mongoose.connection.db.collection('addtocarts').count(function(err, count) {
    console.dir(err);
    console.dir(count);

    if( count == 0) {
        console.log("No Found Records.");
    }
    else {
        console.log("Found Records : " + count);
    }
});


res.send({message:"product added to cart",c:checkoutcart});
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

router.put("/updateusercart/:id",auth,async(req,res)=>{
try{
let prid=await usercart.CartModel.findById(req.params.id);
if(!prid){return res.status(402).send({message:"product id not found"})};
prid['quantity']=req.body.quantity
prid['totalPrice']=prid.price*prid.quantity
    res.send({message:"add to cart updated"});
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

router.get("/getallusercart",async(req,res)=>{
try{

    let getdata=await usercart.CartModel.find();
    
    res.send(getdata);
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});


router.post("/cartbyuser",auth,async(req,res)=>{
try{
let uid= await userreg.UserModel.findById(req.userRegistrationSchema._id)
                                .select("UserLogin.userEmail");

let checkoutcart=await usercart.CartModel.find({'userEmail':uid.UserLogin.userEmail});
res.send({message:"success",c:checkoutcart});
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

router.post("/addquantity",async(req,res)=>{
try{
 let pdata=await usercart.CartModel.findById(req.body.id);
 if(!pdata){return res.status(402).send({message:"product not found in cart"})};
 console.log(pdata);
 if(pdata==pdata.products.id)
 {
 userquantity=+1;
 }
 res.send({message:"quantity added"});
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

router.delete("/removecartitem/:id",async(req,res)=>{
try{
    let cartid= await usercart.CartModel.findByIdAndRemove(req.params.id);
    if(!cartid){return res.status(402).send({message:"cart id not found"})};
    res.send({message:"removed item from cart"});
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

module.exports=router;