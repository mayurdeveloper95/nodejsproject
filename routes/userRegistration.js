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
let alluser=await UserRegister.UserModel.find({isAdmin:false});
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
        if(error){return res.status(403).send(error.details[0].message)};
        let emailid=await UserRegister.UserModel.findOne({"UserLogin.userEmail":req.body.UserLogin.userEmail});
        if(emailid){return res.status(403).send({message:"Email Id Already Exists!!!"})};
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

        if (!createuser.termsAcceptCheck) {
            return res.status(403).send({message:"Please Accept Our Policy... Otherwise you cannot proceed further"});
          }
 
  let salt=await bcrypt.genSalt(10);
        createuser.UserLogin.userPassword=await bcrypt.hash(createuser.UserLogin.userPassword,salt);
        let user=await createuser.save();
        
        let token=user.genToken();
        res.header('auth-key',token).send({message:`new user registered and your login information send to ${user.UserLogin.userEmail}`,u:user,t:token});


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
   }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});


router.delete("/deleteuser/:id",[auth,admin],async(req,res)=>{
try{
    let deleteuser=await UserRegister.UserModel.findByIdAndDelete(req.params.id);
    if(!deleteuser){return res.status(404).send({message:"id not found"})};
    res.send({message:`${deleteuser.firstname} deleted from database`});
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

module.exports=router;