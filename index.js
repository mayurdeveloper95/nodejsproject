let express=require("express");
let ex=express();
ex.use(express.json());
let mongoose=require("mongoose");
require("./startup/dbconnection")(mongoose);


ex.listen("4500",()=>console.log("connect to port 4500"));