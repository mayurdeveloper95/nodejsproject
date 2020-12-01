let express=require("express");
let router=express.Router();
let User=require("../schema/userRegistrationSchema");
let crypto=require("crypto");
let nodemailer=require("nodemailer");

router.post("/sendmail",async(req,res)=>{
  try{
let email=await User.UserModel.findOne({"UserLogin.userEmail":req.body.UserLogin.userEmail});
if(!email){return res.status(402).send({message:"invalid email id"})};
let token=crypto.randomBytes(35).toString("hex");
email.resetPasswordToken=token;
email.resetPasswordExpires=Date.now() + 300000;
await email.save();

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
    to: email.UserLogin.userEmail, // list of receivers
    subject: "Change Password", // Subject line
    text: "open the link to change the password http://localhost:4200/resetpassword/" + token // plain text body
  };
  transporter.sendMail(mailoptions,(error,info)=>{
    if(error){return console.error(error)}
    else{
        console.log(`email send ,${info.messageId}`);
    }
  });

  res.send({message:"please check your email for change the password"});
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

module.exports=router;
