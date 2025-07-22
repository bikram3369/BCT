const Task = require('../models/task');
const History = require('../models/History'); // ✅ Import History model

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const wasIncomplete = !task.completed;
    const nowComplete = req.body.completed;

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (wasIncomplete && nowComplete) {
      await History.create({
        title: updated.title,
        action: 'completed',
        userId: req.user.userId,
        timestamp: new Date(),
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await History.create({
      title: task.title,
      action: 'deleted',
      userId: req.user.userId,
      timestamp: new Date(),
    });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
