const { dbConnect, fromMongoId } = require('./helpers');

const getDogTasks = dbConnect(async (client) => {
    const response = await client
        .db('dog-training')
        .collection('dogtasks')
        .find({})
        .map(fromMongoId)
        .toArray();

    return response;
});

module.exports = {
    getDogTasks,
};
