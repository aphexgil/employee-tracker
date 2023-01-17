const router = require('express').Router();
const { Employee, Role } = require('../../models');

// GET all employees
router.get('/', async (req, res) => {
    try{
        const employeeData = await Employee.findAll({
            include: [
                { model: Role, attributes: ['title', 'salary', 'department_id'], as: 'role' },
                { model: Employee, attributes: ['first_name', 'last_name'], as: 'manager' }
            ]
        });

        if(!employeeData){
            res.status(404).json({message: 'No employees found!'});
            return;
        }
    
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single employee
router.get('/:id', async (req, res) => {
    try{

        const employeeData = await Employee.findByPk(req.params.id,{
            include: [
                { model: Role, attributes: ['title', 'salary', 'department_id'], as: 'role' },
                { model: Employee, attributes: ['first_name', 'last_name'], as: 'manager' }
            ]
        });

        if(!employeeData){
            res.status(404).json({message: 'No role found with that id!'});
            return;
        }
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE an employee
router.post('/', async (req, res) => {
    try{

        const employeeData = await Employee.create({
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role_id: req.body.role_id,
            manager_id: req.body.manager_id
        });

        if(!employeeData){
            res.status(404).json({message: 'Error creating employee.'});
            return;
        }

        res.status(200).json(employeeData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE an employee
router.delete('/:id', async (req, res) => {
    try{
        const employeeData = await Employee.destroy({
            where: {
                id: req.params.id
            }
        });
        
        if(!employeeData){
            res.status(404).json({message: 'No employee found with that id!'});
            return;
        }
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE an employee
router.put('/:id', async (req, res) => {
    try{
        const employeeData = await Employee.findByPk(req.params.id);

        if(!employeeData){
            res.status(404).json({message: 'No employee found with that id!'});
            return;
        }

        employeeData.set({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role_id: req.body.role_id,
            manager_id: req.body.manager_id
        });

        await employeeData.save();

        res.status(200).json(employeeData);

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;
