let express=require("express");
let router=express.Router();
let multer=require("multer");
let imageupload=require("../schema/productImageSchema");
let port="http://localhost:4500";


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "././productimages/")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  function fileFilter (req, file, cb) {
 
    if(file.mimetype === "image/jpg" || file.mimetype ==="image/png" || file.mimetype ==="image/jpeg")
    {
    cb(null, true)
    }
else{
    cb(null,false)
}  
  };
  var upload = multer({ 
    storage: storage,
    limits:{
      filesize:1024*1024*50
    },
    fileFilter:fileFilter
  });

  router.post("/productimageupload", upload.single("image"), async(req,res)=>{
    let fu=new imageupload({
        _id:imageupload._id,
      image:port + "/productimages/" + req.file.filename
    });
    let sd=await fu.save();
    res.send(sd);
  });

  module.exports=router;