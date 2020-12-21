require('dotenv').config();
const mongoose = require('mongoose');
const Dog = require('../src/models/dog');
const { dbUrl } = require('../src/helpers');

mongoose.connect(dbUrl);

const dogs = [
    {
        name: 'Enter',
    },
    {
        name: 'Maffin',
    },
    {
        name: 'Erni',
    },
    {
        name: 'Wafel',
    },
    {
        name: 'Cody duży',
    },
    {
        name: 'Lani',
    },
    {
        name: 'Cody mały',
    },
    {
        name: 'Wega',
    },
    {
        name: 'Cleo',
    },
    {
        name: 'Lucy',
    },
    {
        name: 'Winter',
    },
    {
        name: 'Eliza',
    },
    {
        name: 'Nero',
    },
    {
        name: 'Orion',
    },
    {
        name: 'Lulu',
    },
];

async function setDogsFixtures() {
    for (const dog of dogs) {
        try {
            await Dog.model.create({
                name: dog.name,
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
