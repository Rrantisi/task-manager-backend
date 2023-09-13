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
        // const user = await User.findById(req.query.userId).populate('todos');
        const user = await User.findById(req.user._id).populate('todos');
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