const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DogTaskSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Dog task name field is required'],
        unique: true,
        dropDups: true
    }
});

const DogTask = mongoose.model('dogTask', DogTaskSchema);

module.exports = { model: DogTask, schema: DogTaskSchema };
