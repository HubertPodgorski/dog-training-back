const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Person name has to be provided'],
        unique: true,
        dropDups: true
    },
});

const Person = mongoose.model('person', PersonSchema);

module.exports = {model: Person};
