const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchma = new Schema({
        
    name: {type:String,default:null},
    email: {type:String,default:null},
    mobile: {type: Number,default:null},
    password: {type:String,default:null},
    status: {type:String,default:"active"},
    createdAt: { type: Date, default: new Date()}
})
module.exports = mongoose.model("User", userSchma);