const express = require('express');
const { Register, Login ,current_user, get_users } = require('./../Controllers/UserController');
const {  userCreateRequest } = require("./../Middlewares/User/Validate");
const { loginRequest } = require('../Middlewares/User/LoginRequest');
const auth = require("./../Middlewares/AuthToken");


const router = express.Router();

router.post('/register',userCreateRequest, Register);
router.post('/login' ,loginRequest, Login);
router.get("/me",auth, current_user)
router.get('/users', auth ,get_users);



// router.put('/update',change_password)


module.exports = router;