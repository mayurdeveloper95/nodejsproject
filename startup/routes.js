let userRegister=require("../routes/userRegistration");
let contact=require("../routes/contact");

module.exports=function(ex)
{
ex.use("/api",userRegister);
ex.use("/api",contact);
}