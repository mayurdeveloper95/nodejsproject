let express=require("express");
let router=express.Router();
let bcrypt=require("bcrypt");
let User=require("../schema/userRegistrationSchema");

router.post("/resetpassword/:token",async(req,res)=>{
    try{
let user=await User.UserModel.findOne({
    "resetPasswordToken":req.params.token,
    "resetPasswordExpires":{
        $gt:Date.now()
    }
});
if(!user){return res.status(402).send({message:"invalid token or token expires"})};
let oldpassword=await bcrypt.compare(req.body.UserLogin.userPassword,user.UserLogin.userPassword);
if(oldpassword){return res.status(402).send({message:"password is old pleace change to new passowrd"})};
user.UserLogin.userPassword=req.body.UserLogin.userPassword;
user.resetPasswordToken=undefined;
user.resetPasswordExpires=undefined;
let salt=await bcrypt.genSalt(10);
user.UserLogin.userPassword=await bcrypt.hash(user.UserLogin.userPassword,salt);
await user.save();
res.send({message:"password updated"});

}
catch(error)
{
    res.status(500).send(error.message);
}
});
module.exports=router;