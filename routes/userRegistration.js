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

    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});

module.exports=router;