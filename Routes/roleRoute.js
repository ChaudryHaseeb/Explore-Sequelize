const express = require('express');
const {roleCreate} = require('../Controllers/RoleController');
const RoleCreateRequest = require('./../Middlewares/role/RoleCreateRequest');
const {CreateRole} = require("./../Middlewares/role/RolePermission")

const auth = require("./../Middlewares/AuthToken");



const router = express.Router();

router.post("/role",[auth, RoleCreateRequest], roleCreate);

module.exports = router;