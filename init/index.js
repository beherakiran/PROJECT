if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({quiet:true});
}


const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const { init } = require("../models/user");

main().then(()=>{
    console.log("Connected!")
}).catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
};

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"69b016c23e5e6263d7f1fd4b",}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
};

initDB();