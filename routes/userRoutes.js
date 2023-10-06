const router = require('express').Router();
const {userRegister, loginUser}=require('../controller/usersController');

router.post('/login',loginUser)
router.post('/register',userRegister);

module.exports = router
