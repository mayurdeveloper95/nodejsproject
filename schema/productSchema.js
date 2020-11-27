let mongoose=require("mongoose");
let joi=require("joi");
let category=require("");
let subcategory=require("./subCategorySchema");
let category=require("./categorySchema");

let categorySchema=new mongoose.Schema({
    categoryName:{type:String,required:true,min:1,max:100},
    subCategory:[subcategory.subCategorySchema]
});

let CategoryModel=mongoose.model("categories",categorySchema);

function validateError(error)
{
let schema=joi.object({
categoryName:joi.string().required().min(5).max(100),
subCategoryId:joi.string().required()
});
return schema.validate(error);
}

module.exports={CategoryModel,categorySchema,validateError};


let productSchema=new mongoose.Schema({
name:{type:String,required:true,min:5,max:30},
image:{type:String,required:true,min:5,max:200},
description:{type:String,required:true,min:5,max:200},
price:{type:Number,required:true,minlength:1},
quantity:{type:Number,required:true,min:1,max:100},
offerPrice:{type:Number,required:true,minlength:1},
isAvailable:{type:Boolean,required:true},
isTodayOffer:{type:Boolean,required:true},
category:{
    type:category.categorySchema,required:true
},
subCategory:{
    type:subcategory.subCategorySchema,required:true
},
isAdmin:{type:Boolean},
recordDate:{type:Date,default:Date.now},
updateDate:{type:Date,default:Date.now}
});

let ProductModel=mongoose.model("products",productSchema);

function validateError(error)
{
    schema=joi.object({
        name:joi.string().required().min(5).max(30),
        image:joi.string().required().min(5).max(200),
        description:joi.string().required().min(5).max(200),
        price:joi.number().required().min(1),
        quantity:joi.number().required().min(1).max(100),
        offerPrice:joi.number().required().min(1),
        isAvailable:joi.boolean().required(),
        isTodayOffer:joi.boolean().required(),
        categoryId:joi.string().required(),
        subCategoryId:joi.string().required(),
        isAdmin:joi.boolean(),
        recordDate:joi.date(),
        updateDate:joi.date()
    });
    return schema.validate(error);
}

module.exports={ProductModel,validateError};