const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonTaskSchema = new Schema({
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
    }
});

const DogTrainingSchema = new Schema({
    dogName: {
        type: String,
        required: [true, 'Dog name field is required'],
        unique: true,
        dropDups: true
    },
    trainingDescription: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        required: [true, 'Order of dog has to be provided']
    },
    dogTasks: {
        type: [String],
        default: []
    },
    peopleTasks: {
        type: [PersonTaskSchema],
        default: []
    },
    isDisabled: {
        type: Boolean,
        default: false
    }
});

const DogTraining = mongoose.model('dogTraining', DogTrainingSchema);

module.exports = DogTraining;
