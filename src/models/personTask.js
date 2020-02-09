const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonTaskSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Person task name has to be provided']
    },
});

const PersonTask = mongoose.model('personAndTask', PersonTaskSchema);

module.exports = {model: PersonTask, schema: PersonTaskSchema};
