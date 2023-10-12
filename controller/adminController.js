const jwt = require("jsonwebtoken");
const admin = require("../models/adminSchema");
const User = require("../models/userSchema");
const Products = require("../models/productSchema");
const bcrypt = require("bcrypt");
const cloudinary = require("../cloudinary");
const ErrorClass = require("../helpers/classErrors");
const asyncErrorHandler = require("../helpers/asyncErrorHandler");
require("dotenv").config();

/// admin Login ///

const adminLogin = asyncErrorHandler(async function (req, res, next) {
  const { adminName, password } = req.body;

  const adminstrator = await admin.findOne({ adminName });

  if (adminstrator && (await bcrypt.compare(password, adminstrator.password))) {
    const token = jwt.sign(
      {
        id: adminstrator._id,
        admin: adminstrator.adminName,
      },
      process.env.ADMIN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      status: "success",
      message: "Successfully logged In.",
      data: token,
    });
  } else {
    const err = new ErrorClass("Incorrect Username or Password", 401);

    return next(err);
  }
});

/// view all users ///

const getUsers = asyncErrorHandler(async function (req, res, next) {
  const users = await User.find();
  if (users.length === 0) {
    const err = new ErrorClass("Users does not exist", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    message: "Successfully fetched user datas.",
    data: users,
  });
});
/// view a specific user ///

const getUserById = asyncErrorHandler(async function (req, res, next) {
  const id = req.params.id;
  const selectedUser = await User.findOne({ _id: id });
  if (!selectedUser) {
    const err = new ErrorClass("user does not exist by this id ", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    message: "Successfully fetched user data.",
    data: selectedUser,
  });
});
/// view all products ///

const getAllProducts = asyncErrorHandler(async function (req, res, next) {
  const product = await Products.find();
  if (product.length === 0) {
    const err = new ErrorClass("Products not found");
    return next(err);
  }

  res.status(200).json({
    status: "success",
    message: "Successfully fetched products detail.",
    data: product,
  });
});
/// get products by category using query methode ///

const getByCategory = asyncErrorHandler(async function (req, res, next) {
  const id = req.query.id;

  const products = await Products.find({ category: id });
  if (products.length === 0) {
    const err = new ErrorClass("products by the category does not Found", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    message: "Successfully fetched products .",
    data: products,
  });
});
/// Get a specific Product ///

const getProductById =asyncErrorHandler(async function (req, res,next) {
  const id = req.params.id;
  const currentProduct = await Products.findById(id);
 if(!currentProduct){
  const err = new ErrorClass('product with that id does not exist',404)
  return next(err)
 }
   
    res.status(200).json({
      status: "success",
      message: "Successfully fetched product details.",
      data: currentProduct,
    });

}
)
/// Add a new product ///

const addProduct= asyncErrorHandler(async function (req, res,next) {
  const { title, category, productName, price, productDescription } = req.body;
  

    const uploads = await cloudinary.uploader.upload(req.file.path);
    if(!uploads){
      const error = new ErrorClass('image upload to cloud failed' ,400)
    }
    const add = await Products.create({
      title,
      category,
      src: uploads.url,
      productName,
      price,
      productDescription,
    });
    if(!add){
      const err = new ErrorClass('could not add a Product',400)
      return next(err)
    }
    res.status(201).json({
      status: "success",
      message: "Successfully created a product.",
      data: add,
      message:uploads
    });

}
)
/// Update a product ///

const updatePoduct =asyncErrorHandler(async function (req, res,next) {
  const id = req.params.id;
  const { title, category, productName, price, productDescription } = req.body;
    const uploads = await cloudinary.uploader.upload(req.file.path);

    const product = await Products.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          category: category,
          productName: productName,
          price: price,
          productDescription: productDescription,
          src: uploads.url,
        },
      }
    );
    if(product.modifiedCount===0){
      const err = new ErrorClass('product could not be found',404)
      return next(err)

    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated a product.",
      data: product,
    });

}
)
/// Delete a Product ///

const deleteProduct= asyncErrorHandler(async function (req, res,next) {
  const id = req.params.id;

  
    const result = await Products.deleteOne({ _id: id });
if(result.deletedCount===0){
  const err = new ErrorClass('product does not Exist ' ,404)
  return next(err)
}
    res.json({
      status: "success",
      message: "Successfully deleted a product.",
      data:result
    });

}
)
module.exports = {
  adminLogin,
  getUsers,
  getUserById,
  getAllProducts,
  getByCategory,
  getProductById,
  addProduct,
  updatePoduct,
  deleteProduct,
};
