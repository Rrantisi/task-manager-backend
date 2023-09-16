const express = require('express');
const router = express.Router();
const todosCtrl = require('../controllers/todos');

const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, todosCtrl.index);

router.get('/:id', ensureLoggedIn, todosCtrl.details);

router.post('/add', ensureLoggedIn, todosCtrl.addTodo);

router.post('/update/:id', ensureLoggedIn, todosCtrl.updateTodo);

router.delete('/delete/:id', ensureLoggedIn, todosCtrl.deleteTodo);

module.exports = router;