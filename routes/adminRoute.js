const router = require("express").Router();
const adminAuth = require("../middleware/adminAuth");
const multer = require("../middleware/multer");
const {
  adminLogin,
  getUsers,
  getUserById,
  getAllProducts,
  getByCategory,
  getProductById,
  addProduct,
  updatePoduct,
  deleteProduct
} = require("../controller/adminController");

router.post("/adminLogin", adminLogin);
router.get("/admin/users", adminAuth, getUsers);
router.get("/admin/users/:id", adminAuth, getUserById);
router.get("/admin/poducts", adminAuth, getAllProducts);
router.get("/admin/products?", adminAuth, getByCategory);
router.get("/admin/products/:id", adminAuth, getProductById);
router.post("/admin/products", adminAuth, multer.single("niyas"), addProduct);
router.put("/admin/products/:id",adminAuth,multer.single("niyas"),updatePoduct);
router.delete("/admin/products/:id",adminAuth,deleteProduct)
module.exports = router;
