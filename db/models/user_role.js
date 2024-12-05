'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_role.belongsTo(models.User, {
        through: 'user_role',
        foreignKey: 'role_id',
        otherKey: 'user_id',
      });

      user_role.belongsTo(models.Role, {
        through: 'user_role',
        foreignKey: 'user_id',
        otherKey: 'role_id',
      });
    }
  }
  user_role.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'user_role',
  });
  return user_role;
};