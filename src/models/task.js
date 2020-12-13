const PersonAndTask = require('./personAndTask');
const DogTask = require('./dogTask');
const Dog = require('./dog');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    dogs: {
        type: [
            new Schema({
                name: {
                    type: String,
                    required: [true, 'Dog name field is required'],
                },
            }),
        ],
        default: [],
    },
    description: {
        type: String,
        default: '',
    },
    order: {
        type: Number,
        required: [true, 'Order of dog has to be provided'],
    },
    tasks: {
        type: [
            new Schema({
                name: {
                    type: String,
                    required: [true, 'Dog task name field is required'],
                },
            }),
        ],
        default: [],
    },
    peopleTasks: {
        type: [
            new Schema({
                uuid: {
                    type: String,
                    required: [true, 'Uuid has to be provided'],
                },
                personId: {
                    type: String,
                    required: [true, 'Person id has to be provided'],
                },
                taskId: {
                    type: String,
                    required: [true, 'Task id has to be provided'],
                },
                taskName: {
                    type: String,
                    required: [true, 'Task name has to be provided'],
                },
                personName: {
                    type: String,
                    required: [true, 'Person name has to be provided'],
                },
            }),
        ],
        default: [],
    },
    column: {
        type: String,
        default: 'left',
    },
});

const Task = mongoose.model('task', TaskSchema);

module.exports = { model: Task };
