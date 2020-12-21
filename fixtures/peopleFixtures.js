require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('../src/models/person');
const { dbUrl } = require('../src/helpers');

mongoose.connect(dbUrl);

const people = [
    {
        name: 'Sebastian',
    },
    {
        name: 'Hubert',
    },
    {
        name: 'Paulina',
    },
    {
        name: 'Agnieszka',
    },
    {
        name: 'Ania',
    },
    {
        name: 'Marta',
    },
    {
        name: 'Maga',
    },
    {
        name: 'Kamila',
    },
    {
        name: 'Ola',
    },
    {
        name: 'Mati',
    },
    {
        name: 'Julia',
    },
];

async function setPeopleFixtures() {
    for (const person of people) {
        try {
            await Person.model.create({
                name: person.name,
            });
            console.log(`Created person fixture with name: ${person.name}`);
        } catch (error) {
            console.error(error.errmsg);
        }
    }

    console.log('All people fixtures has been saved');
    process.exit();
}

setPeopleFixtures();
