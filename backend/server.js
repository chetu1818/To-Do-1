const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all active todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Get todo history
app.get('/history', async (req, res) => {
  try {
    const history = await prisma.todoHistory.findMany({
      orderBy: { actionAt: 'desc' },
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const { title, priority, dueDate, category } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = await prisma.todo.create({
      data: { title, priority, dueDate, category },
    });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, priority, dueDate, category } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { title, priority, dueDate, category },
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Mark todo as completed (moves to history)
app.post('/todos/:id/complete', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Use a transaction to ensure both operations succeed
    await prisma.$transaction([
      prisma.todoHistory.create({
        data: {
          originalId: todo.id,
          title: todo.title,
          priority: todo.priority,
          dueDate: todo.dueDate,
          category: todo.category,
          action: 'COMPLETED',
        },
      }),
      prisma.todo.delete({ where: { id: Number(id) } }),
    ]);

    res.json({ message: 'Todo marked as completed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete todo' });
  }
});

// Delete a todo (moves to history)
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await prisma.$transaction([
      prisma.todoHistory.create({
        data: {
          originalId: todo.id,
          title: todo.title,
          priority: todo.priority,
          dueDate: todo.dueDate,
          category: todo.category,
          action: 'DELETED',
        },
      }),
      prisma.todo.delete({ where: { id: Number(id) } }),
    ]);

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
