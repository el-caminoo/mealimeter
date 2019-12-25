const Todo = require('../models/todo_list');
const jwt = require('jsonwebtoken');
require('dotenv').config;





exports.get = (req, res) => {
    Todo.find({}, (err, doc) => {
        if (err){res.send('err')}
        res.send(doc)
    })
}





exports.create_todo = (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token){res.status(404).json({auth: false, message: 'no token found'})} // A token generated during login is required to access this endpoint
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) =>{
        if (err){res.status(500).send('failed to authenticate')}
        let todo = new Todo({
            name: req.body.name
        })
        todo.save(function(err) {
            if (err){
                res.send(err.message);
            }
            res.status(201).json({
                status: "success",
                data: todo
            });
        })
    })

}

exports.update_todo = (req, res) => {
    var token = req.headers['x-access-token']
    if (!token){res.status(404).send('no token found')}
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err){res.status(500).send('failed to authenticate')}
        Todo.findOneAndUpdate(req.params.id, req.body, {new:true}, (err, todo) => {
            if (err){res.status(404).send(err)}
            res.status(201).send(todo)
            });
            
    })
}

exports.delete_todo = (req, res) => {
    var token = req.headers['x-access-token']
    if (!token){res.status(404).send('no token found')}
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err){res.status(500).send('failed to authenticate')}
        Todo.findByIdAndDelete(req.params.id, (err, todo) => {
            if (err){res.status(404).send(err)}
            res.status(201).json({
                status: "succesfully deleted"
            })
        });
    })
}

exports.add_items = (req, res) => {
    var token = req.headers['x-access-token']
    if (!token){res.status(404).send('no token found')}
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err){res.status(500).send('failed to authenticate')}
        Todo.findById(req.params.id, (err, doc) => {
            doc.items.push({
                title: req.body.title  
            })
            doc.save(function(err){
                if (err){
                    console.log(err)
                }
                res.send(doc);
            })
        });
    })
}

exports.delete_items = (req, res) => {
    var token = req.headers['x-access-token']
    if (!token){res.status(404).send('no token found')}
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err){res.status(500).send('failed to authenticate')}
        Todo.findById(req.params.id, (err, doc) => {
            doc.items.id(req.body.id).remove(); //item with the following id is removed from the todo list
            doc.save((err) => {
                if(err){
                    res.status(404)
                }
                res.status(201).send('successfully removed item')
            })
        });
    })
}


exports.items_state = (req, res) => {
    var token = req.headers['x-access-token']
    if (!token){res.status(404).send('no token found')}
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err){res.status(500).send('failed to authenticate')}
        Todo.findById(req.params.id, (err, doc) => {
            var getItem = doc.items.id(req.params.iid); //item with the following id is retrieved from the todo list
            getItem.completed = req.body.completed;
            doc.save((err) => {
                if(err){
                    res.status(404),send(err)
                }
                res.status(201),send(doc)
            })
        });
    })
}

exports.update_items = (req, res) => {
    var token = req.headers['x-access-token']
    if (!token){res.status(404).send('no token found')}
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err){res.status(500).send('failed to authenticate')}
        Todo.findById(req.params.id, (err, doc) => {
            var getItem = doc.items.id(req.params.iid); //item with the following id is retrieved from the todo list
            getItem.title = req.body.title;
            doc.save((err) => {
                if(err){
                    res.status(404)
                }
                res.status(201)
            })
        });
    })
}

exports.change_state = (req, res) => {
    var token = req.headers['x-access-token']
    if (!token){res.status(404).send('no token found')}
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err){res.status(500).send('failed to authenticate')}
        Todo.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, todo) =>{
            if (err){res.status(500).send(err)}
            return res.send(todo)
        });
    })
}








