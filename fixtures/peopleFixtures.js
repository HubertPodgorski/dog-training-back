require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('../src/models/person');

const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds149596.mlab.com:49596/dog-training`;

mongoose.connect(dbUrl);

const people = [
    {
        name: 'Sebastian'
    },
    {
        name: 'Hubert'
    },
    {
        name: 'Paulina'
    },
    {
        name: 'Agnieszka'
    },
    {
        name: 'Ania'
    },
    {
        name: 'Marta'
    },
    {
        name: 'Maga'
    },
    {
        name: 'Jagoda'
    },
    {
        name: 'Kamila'
    },
    {
        name: 'Ola'
    },
    {
        name: 'Mati'
    },
    {
        name: 'Żaneta'
    },
    {
        name: 'Agnieszka I'
    }
];

async function setPeopleFixtures() {
    for (const person of people) {
        try {
            await Person.model.create({
                name: person.name
            });
            console.log(
                `Created person fixture with name: ${person.name}`
            );
        } catch (error) {
            console.error(error.errmsg);
        }
    }

    console.log('All people fixtures has been saved');
    process.exit();
}

setPeopleFixtures();
