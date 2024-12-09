'use strict';

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
    await queryInterface.bulkInsert('Permissions', [
      {
        perm_name: 'user_create',
        perm_description: 'Permission to create roles',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perm_name: 'user_update',
        perm_description: 'Permission to update roles',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perm_name: 'user_delete',
        perm_description: 'Permission to delete roles',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perm_name: 'user_view',
        perm_description: 'Permission to view roles',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Permissions', {
      perm_name: {
        [Sequelize.Op.in]: ['role_create', 'role_update', 'role_delete', 'role_view']
      }
    });
  }
};
