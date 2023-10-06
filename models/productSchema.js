const mongoose = require("mongoose");

const productSchema= new mongoose.Schema({
  title:String,
  category:String,
  src:String,
  link:String,
  template:[],
  productName:String,
  price:String,
  actualPrice:Number,
  weight:String,
  size:String,
  productDescription:[],
  sideImg:Number,
  key:String,
  id:String,
})

module.exports=mongoose.model("products",productSchema)
