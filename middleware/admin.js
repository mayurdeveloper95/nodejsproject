function Admin(req,res,next)
{
if(!req.userRegistrationSchema.isAdmin)
{
   return res.status(402).send({message:"invalid access"});
}
next();
}
module.exports=Admin;