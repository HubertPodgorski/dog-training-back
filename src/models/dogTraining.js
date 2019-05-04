const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    }
});

const DogTraining = mongoose.model('dogTraining', DogTrainingSchema);

module.exports = DogTraining;
