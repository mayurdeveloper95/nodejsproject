let userRegister=require("../routes/userRegistration");
let contact=require("../routes/contact");
let sendmail=require("../routes/sendmail");
let resetpassword=require("../routes/resetpassword");

module.exports=function(ex)
{
ex.use("/api",userRegister);
ex.use("/api",contact);
ex.use("/api",sendmail);
ex.use("/api",resetpassword);
}