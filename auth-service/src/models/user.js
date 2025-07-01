'use strict';

const bcrypt = require('bcrypt')
const { ServerConfig } = require('../config')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: "User_Roles",
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      llowNull: false,
      validate: {
        len: [3, 30],
      }
    },

  }, {
    sequelize,
    modelName: 'User',
  });


  User.beforeCreate(async (user) => {
    try {
      console.log('beforeCreate hook triggered');

      // by default .env stores variables in string format 
      // so convert it to int first
      const saltRounds = parseInt(ServerConfig.SALT); 

      if (isNaN(saltRounds)) {
        throw new Error('ServerConfig.SALT must be a valid number');
      }

      // generate salt
      const salt = await bcrypt.genSalt(saltRounds);
      console.log('salt:', salt);

      // hash the password
      const hashedPassword = await bcrypt.hash(user.password, salt);
      console.log('hashed password:', hashedPassword);

      user.password = hashedPassword;
    } catch (err) {
      console.error('Error in beforeCreate hook:', err);
      throw err; // rethrow so Sequelize knows it failed
    }
  });


  return User;
};