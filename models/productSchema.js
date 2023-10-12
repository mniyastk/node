const mongoose = require("mongoose");

const productSchema= new mongoose.Schema({
  title:String,
  category:String,
  src:String,
  productName:String,
  price:Number,
  weight:{
    type:Number,
  },
  size:String,
  productDescription:[],
  key:String,
  id:String,
})

module.exports=mongoose.model("products",productSchema)
