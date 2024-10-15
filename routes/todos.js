const express = require('express');
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById
} = require('../controllers/todoController');

// Create a new Todo
router.post('/', createTodo);

// Get all Todos
router.get('/', getAllTodos);

// Get a single Todo by ID
router.get('/:id', getTodoById);

// Update a Todo by ID
router.put('/:id', updateTodoById);

// Delete a Todo by ID
router.delete('/:id', deleteTodoById);

module.exports = router;