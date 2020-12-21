const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@dog-training-shard-00-00.raj57.mongodb.net:27017,dog-training-shard-00-01.raj57.mongodb.net:27017,dog-training-shard-00-02.raj57.mongodb.net:27017/dog-training?ssl=true&replicaSet=atlas-14bqs0-shard-0&authSource=admin&retryWrites=true&w=majority`;

module.exports = {
    dbUrl
}