const router = require('express').Router();
const { Role, Department } = require('../../models');

// GET all roles
router.get('/', async (req, res) => {
    try{
        const roleData = await Role.findAll({
            include: [
                { model: Department, attributes: ['name'], as: 'department'}
            ]
        });

        if(!roleData){
            res.status(404).json({message: 'No roles found!'});
            return;
        }
    
        res.status(200).json(roleData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single role
router.get('/:id', async (req, res) => {
    try{

        const roleData = await Role.findByPk(req.params.id);

        if(!roleData){
            res.status(404).json({message: 'No role found with that id!'});
            return;
        }
        res.status(200).json(roleData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a role
router.post('/', async (req, res) => {
    try{

        const roleData = await Role.create({
            id: req.body.id,
            title: req.body.title,
            salary: req.body.salary,
            department_id: req.body.department_id
        });

        if(!roleData){
            res.status(404).json({message: 'Error creating role.'});
            return;
        }

        res.status(200).json(roleData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a role
router.delete('/:id', async (req, res) => {
    try{
        const roleData = await Role.destroy({
            where: {
                id: req.params.id
            }
        });
        
        if(!roleData){
            res.status(404).json({message: 'No role found with that id!'});
            return;
        }
        res.status(200).json(roleData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
