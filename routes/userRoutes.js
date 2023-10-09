const router = require('express').Router();
const {userRegister, loginUser}=require('../controller/usersController');
const {regJoi,logJoi} = require('../middleware/joiSchema')

router.post('/login',logJoi,loginUser)
router.post('/register',regJoi,userRegister);

module.exports = router
