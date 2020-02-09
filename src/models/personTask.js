const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonTaskSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Person task name has to be provided'],
        unique: true,
        dropDups: true
    },
});

const PersonTask = mongoose.model('personTask', PersonTaskSchema);

module.exports = {model: PersonTask, schema: PersonTaskSchema};
