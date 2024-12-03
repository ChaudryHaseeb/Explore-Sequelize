'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      token:{
        type: Sequelize.TEXT('long')
      },
    });
    // await queryInterface.addColumn(User.users, 'token', {
    //   type: Sequelize.TEXT,
    //   allowNull: true,
    // }, {
    //   transaction,
    // });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');


  }
};