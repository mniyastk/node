const jwt = require("jsonwebtoken");
const admin = require("../models/adminSchema");
const User = require("../models/userSchema");
const Products = require("../models/productSchema");
const bcrypt = require("bcrypt");
const cloudinary = require("../cloudinary");
require("dotenv").config();

/// admin Login ///

async function adminLogin(req, res) {
  const { adminName, password } = req.body;
  try {
    const adminstrator = await admin.findOne({ adminName });
    if (
      adminstrator &&
      (await bcrypt.compare(password, adminstrator.password))
    ) {
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
      res.status(401).send("Incorrect username or password");
    }
  } catch (e) {
    res.status(401).send(`User does not exist: ${e}`);
  }
}

/// view all users ///

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      message: "Successfully fetched user datas.",
      data: users,
    });
  } catch (e) {
    res.send(e);
  }
}

/// view a specific user ///

async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      message: "Successfully fetched user data.",
      data: user,
    });
  } catch (error) {
    res.send(error);
  }
}

/// view all products ///

async function getAllProducts(req, res) {
  try {
    const product = await Products.find();
    res.status(200).json({
      status: "success",
      message: "Successfully fetched products detail.",
      data: product,
    });
  } catch (e) {
    res.send(`An error Ocuured during fetching products : ${e}`);
  }
}

/// get products by category using query methode ///

async function getByCategory(req, res) {
  const id = req.query.id;
  try {
    const products = await Products.find({ category: id });
    res.status(200).json({
      status: "success",
      message: "Successfully fetched products .",
      data: products,
    });
  } catch (error) {
    res.send(error);
  }
}

/// Get a specific Product ///

async function getProductById(req, res) {
  const id = req.params.id;
  try {
    const currentProduct = await Products.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      message: "Successfully fetched product details.",
      data: currentProduct,
    });
  } catch (error) {
    res.send(error);
  }
}

/// Add a new product ///
async function addProduct(req, res) {
  const { title, category, productName, price, productDescription } = req.body;
  try {
    const uploads = await cloudinary.uploader.upload(req.file.path);
    const add = await Products.create({
      title,
      category,
      src: uploads.url,
      productName,
      price,
      productDescription,
    });
    res.status(201).json({
      status: "success",
      message: "Successfully created a product.",
      data: add,
    });
  } catch (error) {
    res.send(error);
  }
}

/// Update a product ///

async function updatePoduct(req, res) {
  const id = req.params.id;
  const { title, category, productName, price, productDescription } = req.body;
  try {
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
    res.json({
      status: 'success',
      message: 'Successfully updated a product.',
      data : product
      })
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  adminLogin,
  getUsers,
  getUserById,
  getAllProducts,
  getByCategory,
  getProductById,
  addProduct,
  updatePoduct
};
