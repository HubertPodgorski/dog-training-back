const { dbConnect, fromMongoId, toMongoId } = require('./helpers');

const getPeople = dbConnect(async (client) => {
    const response = await client
        .db('dog-training')
        .collection('people2')
        .find({})
        .map(fromMongoId)
        .toArray();

    return response;
});

const deletePersonById = (id) =>
    dbConnect(async (client) => {
        const person = await client
            .db('dog-training')
            .collection('people2')
            .deleteOne({ _id: id });

        console.log('person => ', person);
    });

const addPerson = (name) =>
    dbConnect(async (client) => {
        const response = await client
            .db('dog-training')
            .collection('people2')
            .insertOne({ name });

        return response;
    });

module.exports = {
    getPeople,
    deletePersonById,
    addPerson,
};
