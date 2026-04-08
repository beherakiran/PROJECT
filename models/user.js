const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose').default;


const UserSchema = new Schema({
   email:{
    type :String,
    required: true,
   },
});
//password and username we be automatically defined by local mongoose with hashing and salting

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);



