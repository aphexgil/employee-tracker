const router = require('express').Router();
const { Department } = require('../../models');

// GET all departments
router.get('/', async (req, res) => {
    try{
        const departmentData = await Department.findAll();

        if(!departmentData){
            res.status(404).json({message: 'No departments found!'});
            return;
        }
    
        res.status(200).json(departmentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single department
router.get('/:id', async (req, res) => {
    try{

        const departmentData = await Department.findByPk(req.params.id);

        if(!departmentData){
            res.status(404).json({message: 'No department found with that id!'});
            return;
        }
        res.status(200).json(departmentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a department
router.post('/', async (req, res) => {
    try{

        const departmentData = await Department.create({
            id: req.body.id,
            name: req.body.name
        });

        if(!departmentData){
            res.status(404).json({message: 'Error creating department.'});
            return;
        }

        res.status(200).json(departmentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a department
router.delete('/:id', async (req, res) => {
    try{
        const departmentData = await Department.destroy({
            where: {
                id: req.params.id
            }
        });
        
        if(!departmentData){
            res.status(404).json({message: 'No department found with that id!'});
            return;
        }
        res.status(200).json(departmentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
