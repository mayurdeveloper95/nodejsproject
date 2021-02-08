let jwt=require("jsonwebtoken");
let config=require("config");

function Auth(req,res,next)
{
    let token=req.header('auth-key');
    if(!token){return res.status(401).send({message:"Access Denied"})};
    try{
    let decoded=jwt.verify(token,config.get("key"));
    req.userRegistrationSchema=decoded;
    next();
    }
    catch(error)
    {
        res.status(402).send({message:"Invalid Auth Key"});
    }
}
module.exports=Auth;