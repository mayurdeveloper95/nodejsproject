let express=require("express");
let router=express.Router();
let User=require("../schema/userRegistrationSchema");
let Joi=require("joi");
let bcrypt=require("bcrypt");

router.post("/authUser",async(req,res)=>{
    let {error}=validateError(req.body);
    if(error){return res.status(402).send(error.details[0].message)};
    let email=await User.UserModel.findOne({"UserLogin.userEmail":req.body.UserLogin.userEmail});
    if(!email){return res.status(402).send({message:"invalid email id"})};
    let password=await bcrypt.compare(req.body.UserLogin.userPassword,email.UserLogin.userPassword);
    if(!password){return res.status(402).send({message:"invalid password"})}

    let token=email.genToken();
res.header("Auth-Key",token).send({message:"login successful"});
});

function validateError(error)
{
    let schema=Joi.object({
        UserLogin:{
            userEmail:Joi.string().email().required(),
            userPassword:Joi.string().min(8).max(20).required()
        }
    });
    return schema.validate(error);
}

module.exports=router;