let mongoose=require("mongoose");
let joi=require("joi");
let subcategory=require("./subCategorySchema");

let categorySchema=new mongoose.Schema({
    categoryName:{type:String,required:true,min:1,max:100},
    subCategory:[{type:subcategory.subCategorySchema}]
});

let CategoryModel=mongoose.model("categories",categorySchema);

function validationError(error)
{
let schema=joi.object({
categoryName:joi.string().required().min(5).max(100),
subCategoryId:joi.string().required()
});
return schema.validate(error);
}

module.exports={CategoryModel,categorySchema,validationError};