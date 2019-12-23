const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const User = require('../server/controllers/user_controller');
const todo = require('../server/controllers/todo_list_controller');

let PORT = process.env.PORT;
let DB = process.env.dbUrl;

mongoose.Promise = global.Promise; 
mongoose.connect(DB);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// application routes
app.post('/user/create', User.create_user);
app.post('/user/login', User.login)
app.post('/todo/create', todo.create_todo)


app.listen(PORT, () => {
    console.log('successfully connected');
});