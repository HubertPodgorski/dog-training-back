const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DogSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Dog name field is required'],
        unique: true,
        dropDups: true
    }
});

const Dog = mongoose.model('dog', DogSchema);

module.exports = {model: Dog, schema: DogSchema};
