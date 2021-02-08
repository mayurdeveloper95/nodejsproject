let mongoose=require("mongoose");
let joi=require("joi");
let product=require("../schema/productSchema");

let cartSchema=new mongoose.Schema({
    userEmail:{type:String,required:true,min:5,max:50},
products:{
    type:product.productSchema,required:true
},
userquantity:{type:Number,min:[1,"quantity cannot be less thane 1"],required:true},
});


let CartModel=mongoose.model("AddToCart",cartSchema);
/*
let checkoutSchema=new mongoose.Schema({
userEmail:{type:String,required:true,min:5,max:50},
cartItems:{type:cartSchema,required:true}
});

let CheckoutModel=mongoose.model("CheckOut",checkoutSchema);
*/
function validationError(error)
{
    let schema=joi.object({
        productsId:joi.string().min(2).max(50),
        userquantity:joi.number().min(1),
    });
    return schema.validate(error);
}

module.exports={CartModel,validationError};