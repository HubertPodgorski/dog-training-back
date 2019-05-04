require('dotenv').config();
const mongoose = require('mongoose');
const DogTraining = require('../src/models/dogTraining');

const dbUrl = `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
}@ds149596.mlab.com:49596/dog-training`;

mongoose.connect(dbUrl);

const dogsInTraining = [
    {
        dogName: 'Enter'
    },
    {
        dogName: 'Maffin'
    },
    {
        dogName: 'Codi'
    },
    {
        dogName: 'Erni'
    },
    {
        dogName: 'Costa'
    },
    {
        dogName: 'Enter'
    }
];

async function setDogsTrainingFixtures() {
    for (const dogInTraining of dogsInTraining) {
        try {
            await DogTraining.create({
                dogName: dogInTraining.dogName
            });
            console.log(
                `Created dog fixture with name: ${dogInTraining.dogName}`
            );
        } catch (error) {
            console.error(error.errmsg);
        }
    }

    console.log('All dog fixtures has been saved');
    process.exit();
}

setDogsTrainingFixtures();
