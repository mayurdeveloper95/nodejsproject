let express=require("express");
let router=express.Router();
let category=require("../schema/categorySchema");
let subcategory=require("../schema/subCategorySchema");

router.post("/addcategory",async(req,res)=>{
    try{
    let {error}=category.validationError(req.body);
    if(error){return res.status(402).send(error.details[0].message)};
    let checksubcat=await subcategory.SubCategoryModel.findById(req.body.subCategoryId);
    if(!checksubcat){return res.status(402).send({message:"subcategory id not matched"})};
    let createcat=new category.CategoryModel({
        categoryName:req.body.categoryName,
        subCategory:{
            _id:checksubcat._id,
            name:checksubcat.name,
            catName:checksubcat.catName
        }
    });
    let cat=await createcat.save();
    res.send({message:"category added",c:cat});
}
catch(error)
{
    res.status(500).send(error.message);
}
})


router.get("/allcategory",async(req,res)=>{
    try{
let allcat=await category.CategoryModel.find();
res.send(allcat);
    }
    catch(error)
{
    res.status(500).send(error.message);
}
});

router.get("/findcategorybyid/:id",async(req,res)=>{
try{
    let catbyid=await category.CategoryModel.find((data)=>data.id===parseInt(req.params.categoryId));
    if(!catbyid){return res.status(400).send({message:"movie id not found"})};
    res.send(catbyid);
}
catch(error)
{
    res.status(500).send(error.message);
}
});

module.exports=router;