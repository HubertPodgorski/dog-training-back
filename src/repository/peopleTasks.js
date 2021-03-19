const { dbConnect, fromMongoId } = require('./helpers');

const getPeopleTasks = dbConnect(async (client) => {
    const response = await client
        .db('dog-training')
        .collection('peopletasks')
        .find({})
        .map(fromMongoId)
        .toArray();

    return response;
});

module.exports = {
    getPeopleTasks,
};
