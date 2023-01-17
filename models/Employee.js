const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Trip model
class Employee extends Model {}

// create fields/columns for Trip model
Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id',
        unique: false
      }
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee'
  }
);

module.exports = Employee;
