const PersonAndTask = require('./personAndTask');
const DogTask = require('./dogTask');
const Dog = require('./dog');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    dogs: {
        type: [Dog.schema],
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        required: [true, 'Order of dog has to be provided']
    },
    tasks: {
        type: [DogTask.schema],
        default: []
    },
    peopleTasks: {
        type: [PersonAndTask.schema],
        default: []
    }
});

const Task = mongoose.model('task', TaskSchema);

module.exports = {model: Task};
