const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

const createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await prismaClient.todo.create({
      data: { title }
    });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await prismaClient.todo.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prismaClient.todo.findUnique({
      where: { id: parseInt(id) }
    });
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

const updateTodoById = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const updatedTodo = await prismaClient.todo.update({
      where: { id: parseInt(id) },
      data: { title, completed }
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

const deleteTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await prismaClient.todo.delete({
      where: { id: parseInt(id) }
    });
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById
};