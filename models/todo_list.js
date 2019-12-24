const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
    title: String,
    completed: {type: Boolean, default: false}
});

let ListSchema = new Schema({
    name: String,
    items: [itemSchema],
    complete: {type: Boolean, default: false}
});

module.exports = mongoose.model('Todo_List', ListSchema);

