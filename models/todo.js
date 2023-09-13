// Todo Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo_description: {
        type: String,
        required: true
    },
    todo_responsible: {
        type: String,
        required: true
    },
    todo_priority: {
        type: String,
        required: true
    },
    todo_completed: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;