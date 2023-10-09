const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  phone: Number,
  cart:[{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
  wishlist:[{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
});
module.exports = mongoose.model("Users", userSchema);
///to do relationship bw cart 