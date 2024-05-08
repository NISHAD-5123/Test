const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    foodItemName:{
        type:String,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    zip:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true
    }
});

const order = new mongoose.model("order",RestaurantSchema);
module.exports = order;