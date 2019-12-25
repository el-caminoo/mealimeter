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
app.get('/users', todo.get);
app.post('/user/create', User.create_user);
app.post('/user/login', User.login)
app.post('/todo/create', todo.create_todo);
app.patch('/todo/change', todo.update_todo);
app.delete('/todo/delete', todo.delete_todo);
app.put('/todo/item/add', todo.add_items);
app.put('/:id/item/:iid/update', todo.update_items);
app.patch('/:id/state', todo.change_state);
app.patch('/:id/items/:iid/state');
app.delete('/:id/item/:iid/delete')

app.listen(PORT, () => {
    console.log('successfully connected');
});