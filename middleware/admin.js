function admin(req,res,next)
{
if(!req.userRegistration.isAdmin)
{
   return res.status(402).send({message:"invalid access"});
}
next();
}
module.exports=admin;