const Todo = require('../models/todoModel');
const asyncHandler = require('../utils/asyncHandler');

const getTodos = asyncHandler(async (req, res) => {
    console.log('UserId:', req.user.userId);
    const todos = await Todo.find({ user: req.user.userId });
    console.log(todos);
    res.json(todos);
});

const createTodo = asyncHandler(async (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400);
        throw new Error('Title is Required');
    }
    const todo = await Todo.create({ title, user: req.user.userId });
    res.status(201).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });
    if (!todo) {
        res.status(404);
        throw new Error('Todo not found');
    }
    todo.title = req.body.title ?? todo.title;
    todo.completed = req.body.completed ?? todo.completed;
    await todo.save();
    res.json(todo);
});

const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });
    if (!todo) {
        res.status(404);
        throw new Error('Todo not found');
    }
    await todo.deleteOne();
    res.json({ message: 'Todo deleted' });
});

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};