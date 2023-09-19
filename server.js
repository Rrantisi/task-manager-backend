// require dependencies
// Express is a nodejs web application framework that helps in creating rest APIs.
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cors = require('cors');

// initialize the express app
const app = express();

// configure settings
require('dotenv').config();
// following code will ensure that the code from database.js module runs
require('./config/database');

app.use(cors());

// mount middleware
// before MERN we used urlencoded to serve data that comes from forms-> with MERN we use express.json()
app.use(express.json());
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

// Middleware to verify token and assign user object of payload to req.user
app.use(require('./config/checkToken'));

// API routes come before catch all routes
app.use('/todos', require('./routes/todos'));
app.use('/api/users', require('./routes/api/users'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 3001
app.listen(port, function() {
    console.log(`Express app is running on port: ${port}`)
})