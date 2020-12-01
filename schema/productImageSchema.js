let mongoose=require("mongoose");

let imageschema=mongoose.Schema({
    image:{type:String}
});

let ImageModel=mongoose.model("ProductImages",imageschema);

module.exports={ImageModel,imageschema};