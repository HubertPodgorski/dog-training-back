const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonAndTaskSchema = new Schema({
    uuid: {
        type: String,
        required: [true, 'Uuid has to be provided']
    },
    personId: {
        type: String,
        required: [true, 'Person id has to be provided']
    },
    taskId: {
        type: String,
        required: [true, 'Task id has to be provided']
    },
    taskName: {
        type: String,
        required: [true, 'Task name has to be provided']
    },
    personName: {
        type: String,
        required: [true, 'Person name has to be provided']
    }
});

const PersonAndTask = mongoose.model('personAndTask', PersonAndTaskSchema);

module.exports = {model: PersonAndTask, schema: PersonAndTaskSchema};
