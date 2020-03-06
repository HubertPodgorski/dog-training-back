require('dotenv').config();
const mongoose = require('mongoose');
const Dog = require('../src/models/dog');

const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds149596.mlab.com:49596/dog-training`;

mongoose.connect(dbUrl);

const dogs = [
    {
        name: 'Enter'
    },
    {
        name: 'Maffin'
    },
    {
        name: 'Codi'
    },
    {
        name: 'Erni'
    },
    {
        name: 'Costa'
    },
    {
        name: 'Wafel'
    },
    {
        name: 'Ganta'
    },
    {
        name: 'Cody duży'
    },
    {
        name: 'Lani'
    },
    {
        name: 'Cody mały'
    },
    {
        name: 'Edi'
    },
    {
        name: 'Łajka'
    },
    {
        name: 'Wega'
    },
    {
        name: 'Avar'
    },
    {
        name: 'Cleo'
    },
    {
        name: 'Lucy'
    },
    {
        name: 'Winter'
    }
];

async function setDogsFixtures() {
    for (const dog of dogs) {
        try {
            await Dog.model.create({
                name: dog.name
            });
            console.log(`Created dog fixture with name: ${dog.name}`);
        } catch (error) {
            console.error(error.errmsg);
        }
    }

    console.log('All dog fixtures has been saved');
    process.exit();
}

setDogsFixtures();
