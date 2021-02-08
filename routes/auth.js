let express=require("express");
let router=express.Router();
let User=require("../schema/userRegistrationSchema");
let Joi=require("joi");
let bcrypt=require("bcrypt");
let Auth = require('../middleware/auth');

router.post("/authUser",async(req,res)=>{
    let {error}=validateError(req.body);
    if(error){return res.status(402).send(error.details[0].message)};
    let email=await User.UserModel.findOne({"UserLogin.userEmail":req.body.UserLogin.userEmail});
    if(!email){return res.status(402).send({message:"Invalid Email"})};
    let password=await bcrypt.compare(req.body.UserLogin.userPassword,email.UserLogin.userPassword);
    if(!password){return res.status(402).send({message:"Invalid Password"})}
    let token=email.genToken();
    //console.log(email);
res.send({message:"Login Successful",t:token});
});

router.get("/UserIdentify",Auth,async(req,res)=>
{
    let {error}=validateError(req.body);
    if(error){return res.status(402).send(error.details[0].message)};
    let data=await User.UserModel.findById(req.userRegistrationSchema._id)
                                                                        .select("-UserLogin.userPassword");
    res.send({userdata:data});
})

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