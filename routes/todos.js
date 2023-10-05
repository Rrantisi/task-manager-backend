const express = require('express');
const router = express.Router();
const todosCtrl = require('../controllers/todos');

const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, todosCtrl.index);

router.get('/:id', todosCtrl.details);

router.post('/add', ensureLoggedIn, todosCtrl.addTodo);

router.post('/update/:id', todosCtrl.updateTodo);

router.delete('/delete/:id', todosCtrl.deleteTodo);

module.exports = router;