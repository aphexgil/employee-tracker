const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class Department extends Model {}

// create fields/columns for Location model
Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department'
  }
);

module.exports = Department;
