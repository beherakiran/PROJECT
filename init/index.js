if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ quiet: true });
}

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(() => {
    console.log("Connected to LOCAL DB!");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({}); // ✅ clear old data

  await Listing.insertMany(initData.data); // ✅ insert new data

  console.log("Data was initialized!");
  mongoose.connection.close(); // ✅ close connection
};