const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');
const todoRoutes = express.Router();

todoRoutes.use(authMiddleware)
todoRoutes.get('/', getTodos);
todoRoutes.post('/', createTodo);
todoRoutes.patch('/:id', updateTodo);
todoRoutes.delete('/:id', deleteTodo);

module.exports = { todoRoutes };


