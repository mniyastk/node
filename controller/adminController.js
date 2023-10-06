
const jwt = require("jsonwebtoken");
const Users = require("../models/userSchema");
const { regSchema, loginSchema } = require("../joiSchema");
require("dotenv").config();

/// admin Login ///

async function adminLogin (req,res){
const {username,password}=req.body
const admin=await Users.find({username})
if(admin.password===password){
    const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      admin.token = token;

      res.status(200).send(token);
}
}

