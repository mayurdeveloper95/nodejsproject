let mongoose=require("mongoose");
let joi=require("joi");

let contactSchema=new mongoose.Schema({
    name:{type:String,required:true,min:5,max:30},
    email:{type:String,required:true,min:5,max:50},
    personalmessage:{type:String,required:true,min:20,max:250}
});

let ContactModel=mongoose.model("contactus",contactSchema);

function validateError(error)
{
    let schema=joi.object({
        name:joi.string().required().min(5).max(30),
        email:joi.string().required().min(5).max(50).email(),
        personalmessage:joi.string().required().min(20).max(250)
    });
    return schema.validate(error);
}

module.exports={ContactModel,validateError};