const ErrorClass = require("../helpers/classErrors.js");
const Products = require("../models/productSchema.js");
const Users = require("../models/userSchema.js");
const asyncErrorHandler = require("../helpers/asyncErrorHandler");

/// Get All Products ///

const getAllProducts = asyncErrorHandler(async function (req, res, next) {
  const product = await Products.find();
  if (!product) {
    const err = new ErrorClass("products Not Found ", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

/// Get a specific Product ///

const getProductById = asyncErrorHandler(async function (req, res, next) {
  const id = req.params.id;

  const currentProduct = await Products.findOne({ _id: id });
  if (!currentProduct) {
    const error = new ErrorClass("product is not found", 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    data: currentProduct,
  });
});

/// Get Product By category ///

const getProductByCategory = asyncErrorHandler(async function (req, res, next) {
  const id = req.params.categoryname;
  const category = await Products.find({ category: id });
  if (category.length === 0) {
    const err = new ErrorClass("category Not Found ", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    data: category,
  });
});

/// Add product to Cart ///

const addToCart = async function (req, res, next) {
  const productId = req.params.id;
  const product = await Products.findOne({ _id: productId });

  if (!product) {
    const err = new ErrorClass("Product is not Found ", 404);
    return next(err);
  }
  const currentUser = await Users.findOne({ username: req.user.username });

  const result = currentUser.cart.filter(
    (item) => item._id.toString() === productId
  );
  if (result.length === 0) {
    await Users.updateOne(
      { username: req.user.username },
      { $push: { cart: product._id } }
    );
    res.status(200).json({
      status: "success",
      message: "item added to cart succesfully",
    });
  } else {
    const err = new ErrorClass("item already Exists in Your cart ", 400);
    return next(err);
  }
};

/// view cart ///

const viewCart = asyncErrorHandler(async function (req, res) {
  const userdetail = await Users.findOne({
    username: req.user.username,
  }).populate("cart");
  res.status(200).json({
    status: "success",
    data: userdetail.cart,
  });
});
/// Add to wish list ///

const addToWishist = asyncErrorHandler(async function (req, res, next) {
  const id = req.params.id;

  const product = await Products.findOne({ _id: id });
  if (!product) {
    const err = new ErrorClass("Product is not found ", 404);
    return next(err);
  }
  const currentUser = await Users.findOne({ username: req.user.username });
  const result = currentUser.wishlist.filter(
    (item) => item._id.toString() === id
  );
  if (result.length === 0) {
    await Users.updateOne(
      { username: req.user.username },
      { $push: { wishlist: product } }
    );
    res.status(200).json({ status: "success" });
  } else {
    const err = new ErrorClass("Product already exists in wishlist ", 400);
    return next(err);
  }
});
/// View  Wishlist ///

const viewWishList = asyncErrorHandler(async function (req, res) {
  const user = await Users.findOne({ username: req.user.username }).populate(
    "wishlist"
  );

  res.status(200).json({ status: "success", data: user.wishlist });
});
/// Delete From Wishlist ///

const dltWishList = asyncErrorHandler(async function (req, res,next) {
  const id = req.params.id;

  const user = await Users.findOne({ username: req.user.username });
  const index = user.wishlist.findIndex((item) => item._id.toString() === id);
  console.log(index);
  if (index !== -1) {
    user.wishlist.splice(index, 1);
    await user.save();
    res
      .status(200)
      .json({ message: "item deleted successfully", status: "success" });
  }else {
    const err = new ErrorClass("Item do not exists in Your wishlist ", 404);
return next(err)
  }
});
/// global incorrect route ///
function invalidRoute(req, res, next) {
  const err = new ErrorClass("the page u are requesting is not found ", 404);
  // err.status = "fail ";
  // err.statusCode = 404;
  next(err);
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductByCategory,
  addToCart,
  addToWishist,
  dltWishList,
  viewCart,
  viewWishList,
  invalidRoute,
};
