
    const express = require('express');
    const { createTask, getTasks, updateTask, deleteTask, completeTask } = require('../controllers/taskController');
    const auth = require('../middlewares/authMiddleware');
    const router = express.Router();
    
    router.post('/', auth, createTask);
    router.get('/', auth, getTasks);
    router.patch('/:id', auth, updateTask);
    router.patch('/complete/:id', auth, completeTask); 
    router.delete('/:id', auth, deleteTask);
    
    module.exports = router;
    