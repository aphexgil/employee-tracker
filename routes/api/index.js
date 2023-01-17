const router = require('express').Router();
const departmentRoutes = require('./departmentRoutes');
const roleRoutes = require('./roleRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/department', departmentRoutes);
router.use('/role', roleRoutes);
router.use('/employee', employeeRoutes);

module.exports = router;
