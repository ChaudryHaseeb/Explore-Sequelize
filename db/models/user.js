'use strict';
const { Model} = require('sequelize');
// const User = require("./../migrations/20241203071906-create-user")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: 'role_id',
                as: 'role',
            });
        }
    }

    User.init({
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            token: DataTypes.STRING,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'users',
            modelName: 'User',
        });
    return User;
};
