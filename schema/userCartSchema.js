let mongoose=require("mongoose");
let joi=require("joi");
let product=require("./productSchema");
const { string } = require("joi");

let cartSchema=new mongoose.Schema({
prodId:{type:String,min:5,max:50},
name:{type:String,min:5,max:30},
image:{type:String,min:5,max:50},
price:{type:Number}
});