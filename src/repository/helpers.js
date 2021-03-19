const { ObjectID } = require('mongoose');
const { MongoClient } = require('mongodb');
const { dbUrl } = require('./../helpers');

const fromMongoId = (record) => {
    if (!record) {
        return record;
    }
    const id = record._id;
    delete record.__v;
    delete record._id;
    if (id !== undefined) {
        record.id = id;
    }
    return record;
};

const toMongoId = (record) => {
    if (!record) {
        return record;
    }
    const id = record.id;
    delete record.id;
    if (id !== undefined) {
        record['_id.$oid'] = new ObjectID(id);
    }
    return record;
};

const dbConnect = (handler) => async () => {
    const client = new MongoClient(dbUrl, { useNewUrlParser: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        try {
            return handler(client);
        } catch (e) {
            console.error(e);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

module.exports = { dbConnect, fromMongoId, toMongoId };
