module.exports=function(mongoose)
{
    //db connection
mongoose.connect("mongodb://localhost:27017/nodejsproject",{ useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>console.log("database connected sucessfully"))
.catch((error)=>console.log(`error found ${error.message}`));
}
