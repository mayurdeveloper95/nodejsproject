let mongoose=require("mongoose");
let joi=require("joi");

let userSchema=new mongoose.Schema({
    firstname:{type:String,required:true,min:5,max:30},
    lastname:{type:String,required:true,min:5,max:30},
    newsLetterCheck:{type:Boolean},
    UserLogin:{
            userEmail:{type:String,required:true,unique:true},
            userPassword:{type:String,required:true,min:8,max:25}
    },
    termsAcceptCheck:{type:Boolean,required:true},
    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:Date},
    isAdmin:{type:Boolean},
    recordDate:{type:Date, default:Date.now},
    updateDate:{type:Date, default:Date.now}
});

let UserModel=mongoose.model("UserRegister",userSchema);

function validationError (error)
{
    let schema=joi.object({
        firstname:joi.string().required().min(5).max(30),
        lastname:joi.string().required().min(5).max(30),
        newsLetterCheck:joi.boolean(),
        UserLogin:{
            userEmail:joi.string().required().email(),
            userPassword=joi.string().required().min(8).max(25),
        },
        termsAcceptCheck:joi.boolean().required(),
        resetPasswordToken:joi.string(),
        resetPasswordExpires:joi.date(),
        isAdmin:joi.boolean(),
        recordDate:joi.date(),
        updateDate:joi.date()    
    });
    return schema.validate(error);
}

module.exports={UserModel,validationError};