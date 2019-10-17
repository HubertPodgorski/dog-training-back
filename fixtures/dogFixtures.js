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
        dogName: 'Wafel'
    },
    {
        dogName: 'Ganta'
    },
    {
        dogName: 'Cody duży'
    },
    {
        dogName: 'Lani'
    },
    {
        dogName: 'Cody mały'
    },
    {
        dogName: 'Edi'
    },
    {
        dogName: 'Łajka'
    },
    {
        dogName: 'Wega'
    },
    {
        dogName: 'Avar'
    },
    {
        dogName: 'Kadarka'
    },
    {
        dogName: 'Lucy'
    }
];

async function setDogsTrainingFixtures() {
    const dogListWithOrder = dogsInTraining.map((dogInTraining, index) => ({
        dogName: dogInTraining.dogName,
        order: index
    }));

    for (const dogInTraining of dogListWithOrder) {
        try {
            await DogTraining.create({
                dogName: dogInTraining.dogName,
                order: dogInTraining.order
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
