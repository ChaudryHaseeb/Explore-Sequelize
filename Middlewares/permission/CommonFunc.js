const db = require('./../../db/models');
const User = db.User;
const isAssigned = async (req, permission_key) => {
    const user = await User.findOne({
        where: {
            username: req.user.username
        }
    });
    let is_assigned = false
    let role = await user.getRole();
    if (role) {
        const permission = await getPermission(role, permission_key)
        if (permission && permission.is_assigned) {
            is_assigned = true
        }
    }
    return is_assigned;
}
const sendResponse = (is_assigned, res, next) => {
    if (is_assigned) {
        next()
    } else {
        return res.status(403).json({'message': 'Unauthorized access'});
    }
}
const getPermission = (role, permission_key) => {
    let permissions = role.permissions;
    if ((typeof permissions) == 'string') {
        permissions = JSON.parse(permissions);
    }
    return permissions.find(item => item.uq_key === permission_key);
}
module.exports = {
    isAssigned,
    sendResponse,
    getPermission
}