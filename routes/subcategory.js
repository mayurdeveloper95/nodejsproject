let express=require("express");
let router=express.Router();
let subcategory=require("../schema/subCategorySchema");

router.post("/addsubcategory",async(req,res)=>{
try{
    let {error}=subcategory.validationError(req.body);
    if(error){return res.status(402).send(error.details[0].message)};
    let newsub=new subcategory.SubCategoryModel({
        name:req.body.name,
        catName:req.body.catName
    });

    let createsub=await newsub.save();
    res.send({message:"subcategory created",c:createsub});
}
catch(error)
{
    res.status(500).send(error.message);
}
});

router.get("/allsubcategory",async(req,res)=>{
try{
let getcategory=await subcategory.SubCategoryModel.find();
res.send(getcategory);
}
catch(error)
{
    res.status(500).send(error.message);
}
});

router.post("/pageIndex/:page",async(req,res)=>{
    try{
    let perpage=1;
    let currentpage=req.params.page || 1;
    let data=await subcategory.SubCategoryModel
                                .find()
                                .skip((perpage*currentpage)-perpage)
                                .limit(perpage)
            let pagecount=await subcategory.SubCategoryModel.count();
            let totalpages=Math.ceil(pagecount/perpage);
            res.send({
                perpage:perpage,
                data:data,
                totalpages:totalpages
            });
        }
        catch(error)
{
    res.status(500).send(error.message);
}
    });

module.exports=router;