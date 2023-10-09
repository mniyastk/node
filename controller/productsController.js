const Products = require("../models/productSchema.js");
const Users = require("../models/userSchema.js");

/// Get All Products ///

async function getAllProducts(req, res) {
  try {
    const product = await Products.find();
    res.send(product);
  } catch (e) {
    res.send(`An error Ocuured during fetching products : ${e}`);
  }
}

/// Get a specific Product ///

async function getProductById(req, res) {
  const id = req.params.id;
  try {
    const currentProduct = await Products.findOne({ _id: id });
    res.send(currentProduct);
  } catch (error) {
    res.send(error);
  }
}

/// Get Product By category ///

async function getProductByCategory(req, res) {
  const id = req.params.categoryname;
  try {
    const category = await Products.find({ category: id });
    res.send(category);
  } catch (e) {
    res.send(e);
  }
}

/// Add product to Cart ///

async function addToCart(req, res) {
  const productId = req.params.id;
  try {
    const product = await Products.findOne({ _id: productId });

    if (!product) {
      return res.status(404).send("Product not found");
    }
    const currentUser = await Users.findOne({ _id: req.user.id });

    const result = currentUser.cart.filter(
      (item) => item._id.toString() === productId
    );
    if (result.length === 0) {
      const update = await Users.updateOne(
        { _id: req.user.id },
        { $push: { cart: product._id } }
      );
      if (update.modifiedCount === 1) {
        res.sendStatus(200);
      } else {
        res.send("Not updated");
      }
    } else {
      res.send("item already exists in cart ");
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

/// view cart ///

async function viewCart(req, res) {
  try {
    const userdetail = await Users.findOne({ _id: req.user.id }).populate("cart")
    res.send(userdetail.cart);
  } catch (e) {
    res.status(500).send(e);
  }
}

/// Add to wish list ///

async function addToWishist(req, res) {
  const id = req.params.id;
  try {
    const product = await Products.findOne({ _id: id });
    const currentUser = await Users.findOne({ _id: req.user.id });
    const result = currentUser.wishlist.filter(
      (item) => item._id.toString() === id
    );
    if (result.length === 0) {
      const updateCart = await Users.updateOne(
        { _id: req.user.id },
        { $push: { wishlist: product } }
      );
      res.send(updateCart);
    } else {
      res.send("item alerady in the wishlist");
    }
  } catch (error) {
    res.send(error);
  }
}

/// View  Wishlist ///

async function viewWishList(req, res) {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    res.send(user.wishlist);
  } catch (e) {
    console.log(e);
  }
}

/// Delete From Wishlist ///

async function dltWishList(req, res) {
  const id = req.params.id;
  try {
    const user = await Users.findOne({ _id: req.user.id });
    const index = user.wishlist.findIndex((item) => item._id.toString() === id);
    console.log(index)
    if(index!==-1){
      user.wishlist.splice(index, 1);
      await user.save();
      res.status(200).send("item deleted successfully");
    }else(
      res.send("item does not exist in wishlist")
    )
  } catch (error) {
    res.send(error);
  }
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
};



