const router=require('express').Router();
const adminAuth= require('../middleware/adminAuth')
const {adminLogin,getUsers,getUserById, getAllProducts, getByCategory, getProductById}=require('../controller/adminController')

router.post('/adminLogin',adminLogin)
router.get('/admin/users',adminAuth,getUsers)
router.get('/admin/users/:id',adminAuth,getUserById)
router.get('/admin/poducts',adminAuth,getAllProducts)
router.get('/admin/products?',adminAuth,getByCategory)
router.get('/admin/products/:id',adminAuth,getProductById)

module.exports=router
