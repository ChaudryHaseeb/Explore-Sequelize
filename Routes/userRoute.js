const express = require('express');
const { Register, Login ,current_user, get_users, create } = require('./../Controllers/UserController');
const {  userCreateRequest } = require("./../Middlewares/User/Validate");
const { loginRequest } = require('../Middlewares/User/LoginRequest');
const auth = require("./../Middlewares/AuthToken");
// const { ViewUser, CreateUser, UpdateUser } = require('../Middlewares/User/UserPermission');
const UserPermissions = require("./../Middlewares/User/UserPermission");



const router = express.Router();

router.post('/register',userCreateRequest, Register);
router.post('/login' ,loginRequest, Login);
router.get("/me",auth, current_user);
router.get('/all', [auth, UserPermissions.ViewUser], get_users);
router.post("/user", auth, create);



// router.put('/update',change_password)


module.exports = router;