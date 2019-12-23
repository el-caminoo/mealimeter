const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ListSchema = new Schema({
    name: {type: String, required: true},
    items: [{item_name: String,
            complete:{type: Boolean,
                    default: false
                }
            }]
        });

module.exports = mongoose.model('Todo_List', ListSchema);

