const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Role model
class Role extends Model {}

// create fields/columns for Role model
Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'department',
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
    modelName: 'role'
  }
);

module.exports = Role;
