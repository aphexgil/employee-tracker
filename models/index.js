const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

Department.hasMany(Role, {
  foreignKey: 'department_id',
  onDelete: 'CASCADE'
});

Role.belongsTo(Department, {
  foreignKey: 'department_id',
  as: 'department'
});

Role.hasMany(Employee, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE'
});

Employee.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role'
});

Employee.hasMany(Employee, {
  foreignKey: 'manager_id',
  onDelete: 'CASCADE'
});

Employee.belongsTo(Employee, {
  foreignKey: 'manager_id',
  as: 'manager'
});

module.exports = { Department, Role, Employee };
