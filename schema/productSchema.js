let mongoose=require("mongoose");
let joi=require("joi");
let subcategory=require("./subCategorySchema");
let category=require("./categorySchema");
let images=require("./productImageSchema");

let productSchema=new mongoose.Schema({
name:{type:String,required:true,min:5,max:200},
image:{
    type:images.imageschema,required:true
},
description:{type:String,required:true,min:5,max:500},
price:{type:Number,required:true,minlength:1},
quantity:{type:Number,required:true,min:1,max:100},
offerPrice:{type:Number,required:true,minlength:1},
isAvailable:{type:Boolean,required:true},
isTodayOffer:{type:Boolean,required:true},
category:{
    type:category.categorySchema,required:true
},
subCategory:{
    type:subcategory.subCategorySchema
},
isAdmin:{type:Boolean},
recordDate:{type:Date,default:Date.now},
updateDate:{type:Date,default:Date.now}
});

let ProductModel=mongoose.model("products",productSchema);

function validationError(error)
{
    schema=joi.object({
        name:joi.string().required().min(5).max(200),
        imageId:joi.string().required(),
        description:joi.string().required().min(5).max(500),
        price:joi.number().required().min(1),
        quantity:joi.number().required().min(1).max(100),
        offerPrice:joi.number().required().min(1),
        isAvailable:joi.boolean().required(),
        isTodayOffer:joi.boolean().required(),
        categoryId:joi.string(),
        subCategoryId:joi.string(),
        isAdmin:joi.boolean(),
        recordDate:joi.date(),
        updateDate:joi.date()
    });
    return schema.validate(error);
}

module.exports={ProductModel,validationError};