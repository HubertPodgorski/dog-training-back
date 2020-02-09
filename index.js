require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const routers = require('./src/routes/routesIndex');
const mongoose = require('mongoose');
var cors = require('cors');

const dbUrl = `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
}@ds149596.mlab.com:49596/dog-training`;

mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// setup app
const app = express();

// Set up a whitelist and check against it:
const whitelist = [
    'http://localhost:3000',
    'https://mystifying-jepsen-f3d5b0.netlify.com',
    'https://dog-training-back.herokuapp.com'
];
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const apiPrefix = '/api';
const resourcesPrefix = '/resources';
app.use(bodyParser.json());
app.use(`${apiPrefix}`, routers.dogTraining);
app.use(`${resourcesPrefix}`, routers.resources);

// setup port
app.listen(process.env.PORT || 3001, () => {
    console.log(
        `Server is ready and listening on port: ${process.env.PORT || 3001}...`
    );
});
