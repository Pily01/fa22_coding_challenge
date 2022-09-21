const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* CREATE 'taskSchema' */
const TaskSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("Task", TaskSchema);