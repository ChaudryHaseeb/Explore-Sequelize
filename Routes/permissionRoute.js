const express = require('express');
const {permissions} = require('../Controllers/PermissionController');
const auth = require("./../Middlewares/AuthToken");



const router = express.Router();

router.get("/permissions",auth , permissions);

module.exports = router;