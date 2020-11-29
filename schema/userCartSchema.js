let mongoose=require("mongoose");
let joi=require("joi");
let product=require("./productSchema");


let cartSchema=new mongoose.Schema({
prodId:{type:String,min:5,max:50},
name:{type:String,min:5,max:30},
image:{type:String,min:5,max:50},
price:{type:Number,required:true,minlength:1},
quantity:{type:Number,required:true,minlength:1},
totalPrice:{type:Number,required:true,minlength:1},
recordDate:{type:Date,default:Date.now},
updateDate:{type:Date,default:Date.now}
});

let CartModel=mongoose.model("AddToCart",cartSchema);

let checkoutSchema=new mongoose.Schema({
userEmail:{type:String,required:true,min:5,max:50},
cardItems:{type:cartSchema,required:true}
});

let CheckoutModel=mongoose.model("CheckOut",checkoutSchema);

function validationError(error)
{
    let schema=joi.object({
        prodId:joi.string().min(5).max(50),
        name:joi.string().min(5).max(30),
        image:joi.string().min(5).max(50),
        price:joi.number().required().min(1),
        quantity:joi.number().required().min(1),
        totalPrice:joi.number().required().min(1),
        recordDate:joi.date(),
        updateDate:joi.date()
    });
    return schema.validate(error);
}

module.exports={cartSchema,checkoutSchema,CartModel,CheckoutModel,validationError};
