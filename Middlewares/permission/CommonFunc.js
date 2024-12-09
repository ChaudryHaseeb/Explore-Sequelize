const db = require("./../../db/models");
const User = db.User;
const Role = db.user_role;
const isAssigned = async (req, permission_key) => {
  const user = await User.findOne({
    where: {
      username: req.user.username,
    },
  });
  let is_assigned = false;
  const role = await Role.findOne({ where: { user_id: user.id } });
  //console.log("role name---------------", role);

  if (role.role_id) {
    const permission = await isPermissionExist(role.role_id, permission_key);
    // console.log("permission key====", permission);
    if (permission && permission_key) {
      is_assigned = true;
    }
  }
  return is_assigned;
};
const sendResponse = (is_assigned, res, next) => {
//   console.log("is assigned#### ", is_assigned);
  if (is_assigned) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized access" });
  }
};
const isPermissionExist = async (role_id, permission_key) => {
  let permission = await db.Permission.findOne({
    where: { perm_name: permission_key },
  });
  let permissionExist = false;
  if (permission) {
    const roleperm = await db.RolePermission.findOne({
      where: { role_id: role_id, perm_id: permission.id },
    });
    // console.log("Role Permissions ", roleperm);
    if (roleperm) {
      permissionExist = true;
    }
  }
//   console.log("######", permission);
  return permissionExist;
};
module.exports = {
  isAssigned,
  sendResponse,
  isPermissionExist,
};
