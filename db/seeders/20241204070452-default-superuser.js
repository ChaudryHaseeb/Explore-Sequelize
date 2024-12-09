'use strict';
const db = require("./../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  //  const { Role, Permissions, RolePermission } = db;
    // const Role = db.Role;
    // const permission= db.permissions
    // const rolePerm = db.RolePermission;
    const role = await db.Role.create(
      {
        role_name: 'Super Admin',
        role_description:'All Access',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const PermissionData = await db.Permission.findAll({ attributes: ['id'] , raw:true, subQuery:false});
      const perm_id = await PermissionData.map((perm)=> perm.id);
      await db.Role.findOne({ where: { role_name: 'Super Admin' } });
      const RolePermissio = await perm_id.map((perm_id)=>({
        role_id: role.id,
        perm_id: perm_id,
        createdAt: new Date(),
        updatedAt: new Date(),


      }))

 await queryInterface.bulkInsert('Role_Permissions', RolePermissio);

},

async down (queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
  *
  * Example:
  * await queryInterface.bulkDelete('People', null, {});
  */
   await queryInterface.bulkDelete('Roles', null, {name: 'Super Admins'});
   await queryInterface.bulkDelete('RolePermissions', null);
  }
};
