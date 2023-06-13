"use strict";
const { Model } = require("sequelize");
const { hasher } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Username has to be an email format",
          },
          notNull: true,
          notEmpty: true,
        },
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          lengthCheck(value) {
            if (value.length < 6) {
              throw new Error("Minimal Password Length is 6");
            }
          },
          capitalCheck(value) {
            if (
              !value
                .split("")
                .some((e) => (isNaN(e) ? e.toUpperCase() === e : false))
            ) {
              throw new Error("Password has no Capital Letter");
            }
          },
          numberCheck(value) {
            if (!value.split("").some((e) => !isNaN(e))) {
              throw new Error("Password has no Number");
            }
          },
        },
      },
      Age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          ageCheck(value) {
            if (+value < 18) {
              throw new Error("Age Under 18");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.Password = hasher(user.Password);
  });

  return User;
};
