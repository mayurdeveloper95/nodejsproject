let express=require("express");
let router=express.Router();
let products=require("../schema/productSchema");
let getimage=require("../schema/productImageSchema");
let category=require("../schema/categorySchema");
let subcategory=require("../schema/subCategorySchema");
let auth=require("../middleware/auth");
let admin=require("../middleware/admin");


router.post("/addproduct",async(req,res)=>{
try{
    let {error}=products.validationError(req.body);
    if(error){return res.status(402).send(error.details[0].message)};
    let name=await category.CategoryModel.findById(req.body.categoryId);
    if(!name){return res.status(403).send({message:"category id not found "})};
    let img= await getimage.ImageModel.findById(req.body.imageId);
    if(!img){return res.status(403).send({message:"image id not found "})};

    let newproduct= new products.ProductModel({
        name:req.body.name,
        image:{
          _id:img._id,
          image:img.image
        },
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity,
        offerPrice:req.body.offerPrice,
        isAvailable:req.body.isAvailable,
        isTodayOffer:req.body.isTodayOffer,
        category:{
            _id:name._id,
            categoryName:name.categoryName,
            subCategory:name.subCategory
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

router.get("/allproducts",async(req,res)=>{
try{
let getalldata=await products.ProductModel.find();
res.send(getalldata);
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

router.put("/updateproduct/:id",async(req,res)=>{
try{
let checkid=await products.ProductModel.findById(req.params.id);
if(!checkid){res.status(401).send({message:"product id not found"})};
checkid['price']=req.body.price,
checkid['quantity']=req.body.quantity,
checkid['offerPrice']=req.body.offerPrice,
checkid['isAvailable']=req.body.isAvailable
checkid['isTodayOffer']=req.body.isTodayOffer
let udata=await checkid.save();
res.send({message:"data updated",u:udata});
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

router.get("/findproductbyid/:id",async(req,res)=>{
try{
    let productbyid=await products.ProductModel.findById(req.params.id);
    if(!productbyid){return res.status(400).send({message:"category id not found"})};
    res.send(productbyid);
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

router.delete("/removeproduct/:id",[auth,admin],async(req,res)=>{
try{
    let productby=await products.ProductModel.findById(req.params.id);
    if(!productby){return res.status(400).send({message:"prodcut id not in database"})};
    let productdelete=await products.ProductModel.findByIdAndDelete({_id:req.params.id});
    if(!productdelete){return res.status(400).send({message:"product id not found"})};
    res.send({message:"product deleted"});
}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

router.get("/findtodayoffer",async(req,res)=>{
try{
let todayoffer=await products.ProductModel.find({isTodayOffer:true});
res.send({t:todayoffer});

}
catch(error)
    {
        res.status(500).send(error.message);
    }
});

router.get("/findlatestproduct",async(req,res)=>{
try {
    let availableproduct=await products.ProductModel.find({isAvailable:true});
res.send({a:availableproduct});
}  
catch(error)
    {
        res.status(500).send(error.message);
    }
});
router.post("/productpageindex/:page",async(req,res)=>{
    try{
    let perpage=2;
    let currentpage=req.params.page || 1;
    let data=await products.ProductModel
                                .find()
                                .skip((perpage*currentpage)-perpage)
                                .limit(perpage)
            let pagecount=await products.ProductModel.count();
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
    router.post("/category/:catid/page/:pageindex",async(req,res)=>{
        try{ 
        let perpage=1;
        let currentpage=req.params.pageindex || 1;
        let cat=await category.CategoryModel.findById(req.params.catid);
        let data= await products.ProductModel.
                                     find({"category.categoryName":cat.categoryName})
                                    .skip((perpage*currentpage)-perpage)
                                    .limit(perpage);
                let pagecount=await products.ProductModel.find({"category.categoryName":cat.categoryName}).count();
                let totalpages=Math.ceil(pagecount/perpage);

               res.send({
                    perpage:perpage,
                    currentpage:currentpage,
                    data:data,
                    pagecount:pagecount,
                    totalpages:totalpages,
                });
            
        }
            
            catch(error)
    {
        res.status(500).send(error.message);
    }
        });


        router.post("/category/:catid/subcategory/:subcatid/page/:pageindex",async(req,res)=>{
            try{
            let perpage=1;
            let currentpage=req.params.pageindex || 1;
            let cat=await category.CategoryModel.findById(req.params.catid);
            let subcat=await subcategory.SubCategoryModel.findById(req.params.subcatid);

            let data=await products.ProductModel.find({"category.categoryName":cat.categoryName,"category.subCategory.name":subcat.name})
                                        .skip((perpage*currentpage)-perpage)
                                        .limit(perpage)
            
                    let pagecount=await products.ProductModel.find({"category.categoryName":cat.categoryName,"category.subCategory.name":subcat.name}).count();
                    let totalpages=Math.ceil(pagecount/perpage);
          
                    res.send({
                        perpage:perpage,
                        currentpage:currentpage,
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