const Todo = require('../models/todoModel');

// const getTodos = async (req, res, next) => {
//     try {
//         const todos = await Todo.find();
//         res.json(todos);
//     } catch (error) {
//         next(error);
//     }
// }

// const createTodo = async (req, res, next) => {
//     try {
//         const { title } = req.body;
//         if (!title) {
//             res.status(400);
//             throw new Error('Title is Required');
//         }
//         const todo = await Todo.create({ title });
//         res.status(200).json(todo);
//     } catch (err) {
//         next(err);
//     }
// }

// const updateTodo = async (req, res, next) => {
//     try {
//         const todo = await Todo.findById(req.params.id);
//         if (!todo) {
//             res.status(404)
//             throw new Error('Todo not found')
//         }
//         todo.title = req.body.title ?? todo.title
//         todo.completed = req.body.completed ?? todo.completed
//         await todo.save();
//         res.json(todo);
//     } catch (err) {
//         next(err);
//     }
// }

// const deleteTodo = async (req, res, next) => {
//     try {
//         const todo = await Todo.findById(req.params.id)
//         if (!todo) {
//             res.status(404)
//             throw new Error('Todo not found')
//         }
//         await todo.deleteOne()
//         res.json({ message: 'Todo deleted' })
//     } catch (err) {
//         next(err)
//     }
// }
const getTodos = async (req, res, next) => {
    try {
        console.log('UserId:', req.user.userId);
        const todos = await Todo.find({ user: req.user.userId });
        console.log(todos)
        res.json(todos);
    } catch (error) {
        next(error);
    }
}

const createTodo = async (req, res, next) => {
    try {
        const { title } = req.body;
        if (!title) {
            res.status(400);
            throw new Error('Title is Required');
        }
        const todo = await Todo.create({ title, user: req.user.userId });
        res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
}

const updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });
        if (!todo) {
            res.status(404);
            throw new Error('Todo not found');
        }
        todo.title = req.body.title ?? todo.title;
        todo.completed = req.body.completed ?? todo.completed;
        await todo.save();
        res.json(todo);
    } catch (err) {
        next(err);
    }
}

const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });
        if (!todo) {
            res.status(404);
            throw new Error('Todo not found');
        }
        await todo.deleteOne();
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}