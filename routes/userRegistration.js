let express=require("express");
let UserRegister=require("../schema/userRegistrationSchema");
let router=express.Router();
let bcrypt=require("bcrypt");


router.get("/alluser", async(req,res)=>{
try
{
let alluser=await UserRegister.find();
res.send(alluser);
}
catch(error)
{
    res.status(500).send(error.message);
}
});


router.post("/newuser",async(req,res)=>{
    try
    {
        let checkerror=validateError(req.body);
        if(checkerror){res.status(402).send(checkerror.details[0].message)};
        let emailid=await UserRegister.UserModel.findOne({"UserLogin.userEmail":req.body.UserLogin.userEmail});
        if(emailid){res.status(403).send({message:"email id already exists"})};
        let crateuser=new UserRegister.UserModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            newsLetterCheck:req.body.newsLetterCheck,
            UserLogin:req.body.UserLogin,
            termsAcceptCheck:req.body.termsAcceptCheck,
            resetPasswordToken:req.body.resetPasswordToken,
            resetPasswordExpires:req.body.resetPasswordToken,
            isAdmin:req.body.isAdmin,
            recordDate:req.body.recordDate,
            updateDate=req.body.updateDate
        });
        let salt=await bcrypt.genSalt(10);
        crateuser.UserLogin.userPassword=await bcrypt.hash(crateuser.UserLogin.userPassword,salt);
        await createuser.save();
        res.send({message:"new user registered"});
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});

module.exports=router;