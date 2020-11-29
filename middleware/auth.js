let jwt=require("jsonwebtoken");
let config=require("config");

function auth(req,res,next)
{
    let tokens=req.header("auth-key");
    if(!tokens){return res.status(401).send({message:"access denied"})};

    try{
    let decode=jwt.verify(tokens,config.get("key"));
    req.userRegistration=decode;
    next();
    }
    catch(error)
    {
        res.status(402).send({message:"invalid auth key"});
    }
}

module.exports=auth;