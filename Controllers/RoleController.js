const Role = require('./../db/models/role');
const db = require('./../db/models');

const roleCreate = async(req, res)=> {
    const Role = db.Role
        const {role_name, role_description, permissions} = req.body;
        console.log(req.body);
        const role = await Role.create({
            role_name: role_name,
            role_description: role_description,
            permissions: permissions,
            key: role_name.replace(' ', '_').toLowerCase(),
            created_by: req.user.user_id,
        });
        res.status(201).json({message: 'Role created successfully.', role: role});
        // return response;
    }
    module.exports = {roleCreate};