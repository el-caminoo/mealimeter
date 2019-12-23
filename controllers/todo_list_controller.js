const Todo = require('../models/todo_list');

exports.create_todo = (req, res) => {
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
        })
    })
}

