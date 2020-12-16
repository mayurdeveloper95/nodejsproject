let mongoose=require("mongoose");
let joi=require("joi");
let images=require("../schema/productImageSchema");


let cartSchema=new mongoose.Schema({
prodId:{type:String,min:2,max:50},
name:{type:String,min:5,max:100},
image:{
    type:images.imageschema,required:true
},
price:{type:Number,required:true,minlength:1},
quantity:{type:Number,required:true,minlength:1},
totalPrice:{type:Number,minlength:1},
recordDate:{type:Date,default:Date.now},
updateDate:{type:Date,default:Date.now}
});

let CartModel=mongoose.model("AddToCart",cartSchema);

let checkoutSchema=new mongoose.Schema({
userEmail:{type:String,required:true,min:5,max:50},
cartItems:{type:cartSchema,required:true}
});

let CheckoutModel=mongoose.model("CheckOut",checkoutSchema);

function validationError(error)
{
    let schema=joi.object({
        prodId:joi.string().min(2).max(50),
        name:joi.string().min(5).max(100),
        imageId:joi.string(),
        price:joi.number().min(1),
        quantity:joi.number().min(1),
        totalPrice:joi.number().min(1),
        recordDate:joi.date(),
        updateDate:joi.date()
    });
    return schema.validate(error);
}

module.exports={cartSchema,checkoutSchema,CartModel,CheckoutModel,validationError};
