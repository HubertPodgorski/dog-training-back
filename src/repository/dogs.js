const { dbConnect, fromMongoId } = require('./helpers');

const getDogs = dbConnect(async (client) => {
    const response = await client
        .db('dog-training')
        .collection('dogs')
        .find({})
        .map(fromMongoId)
        .toArray();

    return response;
});

module.exports = {
    getDogs,
};
