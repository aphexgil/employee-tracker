const sequelize = require('../config/connection');
const { Department, Role, Employee } = require('../models');

const departmentSeedData = require('./departmentSeedData.json');
const roleSeedData = require('./roleSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Department.bulkCreate(departmentSeedData);

  await Role.bulkCreate(roleSeedData);

  await Employee.bulkCreate(employeeSeedData);

  process.exit(0);
};

seedDatabase();
