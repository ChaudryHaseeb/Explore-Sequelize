const db = require("../db/models");

const permissions= async (req, res)=> {
    const Permission = db.Permission;
        const permissions = await Permission.findAll();
         res.status(200).json({permissions: permissions});
        // return response;
    }

module.exports = {permissions};
