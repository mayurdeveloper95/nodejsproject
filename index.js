let express=require("express");
let ex=express();
ex.use(express.json());
let mongoose=require("mongoose");
require("./startup/dbconnection")(mongoose);
require("./startup/routes")(ex);
let config=require("config");

if(!config.get("key"))
{
    process.exit(1);
}

ex.listen("4500",()=>console.log("connect to port 4500"));