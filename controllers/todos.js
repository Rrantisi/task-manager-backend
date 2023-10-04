const Todo = require('../models/todo');
const User = require('../models/user');

module.exports = {
    index,
    details,
    addTodo,
    updateTodo,
    deleteTodo
};

async function index(req, res) {
    try {
        // Find the user by ID and populate the 'todos' field to get the todos associated with the user
        const foundUser = await User.findById(req.user._id).populate('todos');
        if(!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const todos = foundUser.todos;
        res.json(todos);

    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function details(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(req.query.userId).populate('todos');
        const foundTodos = user.todos;
        let todoId, todoInfo;
        foundTodos.forEach(todo => {
            if(todo._id.toString() === id){
                todoId = todo._id;
                todoInfo = {
                    todo_description: todo.todo_description,
                    todo_responsible: todo.todo_responsible,
                    todo_priority: todo.todo_priority,
                    todo_completed: todo.todo_completed
                }
            }
        });
        if (todoId) {
            res.json(todoInfo)
        } else {
            console.log('Todo ID not found');
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });

    }
}

async function addTodo(req, res) {
    try {
        const foundUser = await User.findById(req.user._id);

        if (!foundUser) res.status(404).json({ error: 'User not found' });

        const newTodo = new Todo({
            todo_description: req.body.todo_description,
            todo_responsible: req.body.todo_responsible,
            todo_priority: req.body.todo_priority,
            todo_completed: req.body.todo_completed
        })

        await newTodo.save();
        foundUser.todos.push(newTodo._id);
        await foundUser.save();

        res.status(200).json({ message: 'Todo added successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add new todo' });
    }
}

async function updateTodo(req, res) {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);
        todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;
        const updatedTodo = await todo.save();
        if(!todo) res.status(404).json({ error: 'Todo not found' });
        res.json(updatedTodo);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteTodo(req, res) {
    try {
        const user = await User.findById(req.user._id).populate('todos');
        const foundTodos = user.todos;
        foundTodos.forEach(todo => {
            if(todo._id.toString() === req.params.id) {
                user.todos.pull(todo);
            } else {
                return res.status(404).json({ error: 'Todo not found' });
            }
        })
        const deletedTodo = await user.save();
        res.json(deletedTodo);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}