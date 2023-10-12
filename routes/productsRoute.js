
const router = require("express").Router();
const auth=require('../middleware/auth')
const {
  getAllProducts,
  getProductById,
  getProductByCategory,
  addToCart,
  addToWishist,
  dltWishList,
  viewCart,
  viewWishList,
  invalidRoute,
} = require("../controller/productsController");


router.get('/products',getAllProducts);
router.get("/products/:id",getProductById);
router.get('/products/category/:categoryname',getProductByCategory);
router.post('/:id/cart',auth,addToCart);
router.get('/:id/cart',auth,viewCart);
router.post('/:id/wishlists',auth,addToWishist);
router.get('/:id/wishlists',auth,viewWishList);
router.delete('/:id/wishlists',auth,dltWishList)
router.all('*',invalidRoute)
module.exports = router;

