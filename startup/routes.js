let userRegister=require("../routes/userRegistration");

module.exports=function(ex)
{
ex.use("/api",userRegister);
}