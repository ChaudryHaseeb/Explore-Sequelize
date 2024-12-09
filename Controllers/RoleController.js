const db = require("./../db/models");

const roleCreate = async (req, res) => {
  const Role = db.Role;
  const rolePermission = db.RolePermission;

  const { role_name, role_description, permissions } = req.body;

    const role = await Role.create(
      {
        role_name: role_name,
        role_description: role_description,
      });

    const rolePermissions = permissions.map((perm_id) => ({
      role_id: role.id,
      perm_id: perm_id,
    }));

    await rolePermission.bulkCreate(rolePermissions);
    res.status(201).json({
      message: "Role created successfully.",
      role: role,
      rolePermissions: rolePermissions,
    });

};

const roleUpdate = async (req, res) => {
  const Role = db.Role;
  const rolePermission = db.RolePermission;
  const id = req.params.id;
  const { role_name, role_description, permissions } = req.body;

  const role = await Role.update(
    {
      role_name: role_name,
      role_description: role_description,
      permissions : permissions,
    },
    { where: { id: id } },
  );
console.log("================#################",role);


 const existingPermission= await rolePermission.findAll({
  where: {
    role_id: id
  }
});

console.log("=====================!!!!!!!!!!!!!!!!!!!!!!!!!",existingPermission);
if(existingPermission.length > 0){
  await rolePermission.destroy({
    where: {
        role_id: id
    }
})
  }

  const newPermission = permissions.map((perm_id) => ({
    role_id: id,
    perm_id: perm_id,
  }));
  console.log("================",newPermission)

  await rolePermission.bulkCreate(newPermission);


  res
    .status(201)
    .json({
      message: "Role updated successfully.",
      role: role,
      rolePermissions: newPermission,
    });
};
module.exports = { roleCreate, roleUpdate };