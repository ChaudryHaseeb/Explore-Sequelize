'use strict';
const db = require("./../models");

const bcrypt=require("bcrypt")
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
    await queryInterface.bulkInsert('users', [{
      username: 'admin',
      email: 'superadmin@system.com',
      password: await bcrypt.hash('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date()
  }]);

  const RoleData = await db.Role.findOne({ where: { role_name: 'Super Admin' }});
  const  UserData=await db.User.findOne({ where: { username: 'admin' },  raw: true });

      const userRole =  [{
        user_id: UserData.id,
        role_id: RoleData.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]

 await queryInterface.bulkInsert('User_Roles', userRole);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});

  }
};
