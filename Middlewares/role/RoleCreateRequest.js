const {body, validationResult} = require('express-validator');
const db = require('./../../db/models');
const RoleCreateRequest = [
    body('role_name')
        .not().isEmpty().trim().escape()
        .withMessage('Invalid role name entered'),
    async (req, res, next) => {
        const Role=db.Role;
        const errors = validationResult(req);
        const {role_name} = req.body;
        console.log("############")
        console.log(req.body)
        const role = await Role.findOne({
            where: {
                role_name: role_name
            }
        });
        console.log("$$$$$$")
        console.log("Role ",role)
        if (role)
            return res.status(409).json({message: 'A role already exist with similar name.'}).send();
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        else
            next();
    }
]

module.exports=RoleCreateRequest;