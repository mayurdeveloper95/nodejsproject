let express=require("express");
let router=express.Router();
let image=require("../schema/productImageSchema");
let usercart=require("../schema/userCartSchema");
let auth=require("../middleware/auth");
let userreg=require("../schema/userRegistrationSchema");

router.post("/addtocart",async(req,res)=>{
try{
let {error}=usercart.validationError(req.body);
if(error){return res.status(403).send(error.details[0].message)};
let img= await image.ImageModel.findById(req.body.imageId);
if(!img){return res.status(403).send({message:"image id not found "})};
let addcart=usercart.CartModel({
prodId:req.body.prodId,
name:req.body.name,
image:{
    _id:img._id,
    image:img.image
  },
  price:req.body.price,
  quantity:req.body.quantity,
  totalPrice:req.body.price*req.body.quantity
});

let savecart= await addcart.save();
res.send({message:"prodcut added to cart",s:savecart});
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

    let getdata=await usercart.CartModel.find()
                        .select('prodId name image price quantity totalPrice');
    res.send(getdata);
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});


router.post("/cartbyuser",auth,async(req,res)=>{
try{
let uid= await userreg.UserModel.findById(req.userreg._id)
                                .select("firstname lastname UserLogin.userEmail isAdmin");

let checkoutcart=await usercart.CheckoutModel.find({"userEmail":uid.UserLogin.userEmail});
res.send({message:"success",c:checkoutcart});
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