const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Person name has to be provided'],
        unique: true,
        dropDups: true,
    },
});

const Person = mongoose.model('person', PersonSchema);

module.exports = { model: Person };

// const MongoClient = require('mongodb').MongoClient;
//
// MongoClient.connect(dbUrl, (err, client) => {
//     if (err) throw err;
//
//     const db = client.db('animals');
//
//     db.collection('mammals')
//         .find()
//         .toArray(function (err, result) {
//             if (err) throw err;
//
//             console.log(result);
//         });
// });
