let mongoose=require("mongoose");
let joi=require("joi");

let subCategorySchema=new mongoose.Schema({
    name:{type:String,required:true,min:5,max:100},
    catName:{type:String}
});

let SubCategoryModel=mongoose.model("SubCategories",subCategorySchema);

function validateError(error)
{
let schema=joi.object({
    name:joi.string().required().min(5).max(100),
    catName:joi.string().required()
});
return schema.validate(error);
}

module.exports={SubCategoryModel,subCategorySchema,validateError};