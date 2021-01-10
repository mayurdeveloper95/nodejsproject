let userRegister=require("../routes/userRegistration");
let contact=require("../routes/contact");
let sendmail=require("../routes/sendmail");
let resetpassword=require("../routes/resetPassword");
let products=require("../routes/product");
let productimage=require("../routes/productImageUpload");
let subcategory=require("../routes/subCategory");
let category=require("../routes/category");
let usercart=require("../routes/userCart");
let auth=require("../routes/auth");

module.exports=function(ex)
{
ex.use("/api",userRegister);
ex.use("/api",contact);
ex.use("/api",sendmail);
ex.use("/api",resetpassword);
ex.use("/api",products);
ex.use("/api",productimage);
ex.use("/api",subcategory);
ex.use("/api",category);
ex.use("/api",usercart);
ex.use("/api",auth);
}