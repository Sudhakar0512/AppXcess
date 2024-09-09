const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description, priority, dueDate } = req.body;

    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const task = new Task({
            user: req.user.userId, 
            title,
            description,
            priority,
            dueDate,
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!');
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { priority, dueDate } = req.query;

        const filter = { user: req.user.userId };

        if (priority) {
            filter.priority = priority;
        }

        if (dueDate) {
            filter.dueDate = dueDate;
        }

        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  try {
      const task = await Task.findById(req.params.id);

      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }

      if (task.user.toString() !== req.user.userId) {
          return res.status(401).json({ message: 'Not authorized' });
      }

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (priority !== undefined) task.priority = priority;
      if (dueDate !== undefined) task.dueDate = dueDate;

      await task.save();
      res.json(task);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};

exports.completeTask = async (req, res) => {
  try {
      const task = await Task.findById(req.params.id);

      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }

      if (task.user.toString() !== req.user.userId) {
          return res.status(401).json({ message: 'Not authorized' });
      }

      task.completed = !task.completed;
      await task.save();
      res.json(task);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};

exports.deleteTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
