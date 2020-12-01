let express=require("express");
let router=express.Router();
let products=require("../schema/productSchema");
let category=require("../schema/categorySchema");
let subcategory=require("../schema/subCategorySchema");
let getimage=require("../schema/productImageSchema");
let port="http://localhost:4200";


router.post("/addproduct",async(req,res)=>{
try{
    let {error}=products.validationError(req.body);
    if(error){return res.status(402).send(error.details[0].message)};
    let name=await products.ProductModel.findOne({"ProductModel.name":req.body.ProductModel.name});
    if(name){return res.status(403).send({message:"product already added"})};
    let cat=await category.CategoryModel.findById(req.body.categoryId);
    let subcat=await subcategory.SubCategoryModel.findById(req.body.subCategoryId);
    let prodimage=await getimage.ProductModel.findById(req.body.imageId);
  
    let newproduct= new products.ProductModel({
        name:req.body.name,
        image:{
          _id:prodimage._id
        },
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity,
        offerPrice:req.body.offerPrice,
        isAvailable:req.body.isAvailable,
        isTodayOffer:req.body.isTodayOffer,
        category:{
            _id:cat.categoryId,
            categoryName:cat.categoryName,
            subCategory:{
                    _id:subcat.subCategoryId,
                    name:[subcat.name],
                    catName:subcat.catName
            }
        },
        isAdmin:req.body.isAdmin
    });
let saveproduct=await newproduct.save();
res.send({message:"prodcut added",p:saveproduct});
}  
  catch(error)
    {
        res.status(500).send(error.message);
    }
});
module.exports=router;