let express=require("express");
let cors = require('cors');
let ex=express();
ex.use(cors());
ex.use(express.json());
let mongoose=require("mongoose");
const port = process.env.PORT || 4500;
let morgan=require("morgan");
require("./startup/dbconnection")(mongoose);
require("./startup/routes")(ex);
let config=require("config");
let Fawn=require('fawn');

Fawn.init(mongoose);
if(!config.get("key"))
{
    console.log("server get crashed");
    process.exit(1);
}
if(config.get('host.mode') === 'Development mode'){
    ex.use(morgan('tiny'));
};
if(process.env.NODE_ENV === 'Production'){
    console.log(`password: ${config.get('password')}`);
}

ex.use("/productimages",express.static('productimages'));
ex.listen(port,()=>console.log(`connect to port ${port}`));