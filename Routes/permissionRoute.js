const express = require('express');
const {permissions} = require('../Controllers/PermissionController');


const router = express.Router();

router.get("/p", permissions);

module.exports = router;