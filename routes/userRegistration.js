let express=require("express");
let UserRegister=require("../schema/userRegistrationSchema");
let router=express.Router();
let bcrypt=require("bcrypt");
let auth=require("../middleware/auth");
let admin=require("../middleware/admin");
let nodemailer=require("nodemailer");

router.get("/alluser", async(req,res)=>{
try
{
let alluser=await UserRegister.UserModel.find();
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
        let {error}=UserRegister.validationError(req.body);
        if(error){res.status(402).send(error.details[0].message)};
        let emailid=await UserRegister.UserModel.findOne({"UserLogin.userEmail":req.body.UserLogin.userEmail});
        if(emailid){res.status(403).send({message:"email id already exists"})};
        let createuser=new UserRegister.UserModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            newsLetterCheck:req.body.newsLetterCheck,
            UserLogin:req.body.UserLogin,
            termsAcceptCheck:req.body.termsAcceptCheck,
            resetPasswordToken:req.body.resetPasswordToken,
            resetPasswordExpires:req.body.resetPasswordToken,
            isAdmin:req.body.isAdmin,
            recordDate:req.body.recordDate,
            updateDate:req.body.updateDate
        });


 
  let salt=await bcrypt.genSalt(10);
        createuser.UserLogin.userPassword=await bcrypt.hash(createuser.UserLogin.userPassword,salt);
        let user=await createuser.save();
              //sender details
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "*********************", // generated ethereal user
      pass: "********", // generated ethereal password
    },
  });

let mailoptions=  {
    from: '"Fred Foo 👻" <testworks59@gmail.com>', // sender address
    to: user.UserLogin.userEmail, // list of receivers
    subject: "New User Registered", // Subject line
    text: "new user registered",
    html: `Email:${user.UserLogin.userEmail} <br/>
            Password:${user.UserLogin.userPassword}`
  };
        
        transporter.sendMail(mailoptions,(error,info)=>{
            if(error){return console.error(error)}
            else{
                console.log(`email send ,${info.messageId}`);
            }
          });
          let token=user.genToken();
        res.header("auth-key",token).send({message:`new user registered and your login information send to ${user.UserLogin.userEmail}`,u:user,t:token});
   }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});


router.delete("/deleteuser/:id",[auth,admin],async(req,res)=>{
try{
    let {error}=validateError(req.body);
    if(error){res.status(402).send(error.details[0].message)};
    let deleteuser=UserRegister.UserModel.findByIdAndDelete(req.params.UserLogin.userEmail);
    if(!deleteuser){res.status(404).send({message:"email id not found"})};
    res.send("user deleted");
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

module.exports=router;