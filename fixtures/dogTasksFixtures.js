require('dotenv').config();
const mongoose = require('mongoose');
const DogTask = require('../src/models/dogTask');
const { dbUrl } = require('../src/helpers');

mongoose.connect(dbUrl);

const dogTasks = [
    {
        name: 'Box',
    },
    {
        name: 'Recall',
    },
    {
        name: 'Ball possession',
    },
    {
        name: 'Ściana',
    },
    {
        name: 'Aport',
    },
    {
        name: 'Aport przez hopki',
    },
    {
        name: 'Power jumping',
    },
    {
        name: 'Crossy',
    },
    {
        name: 'Ściganko - tor lewy',
    },
    {
        name: 'Ściganko - tor prawy',
    },
];

async function setDogTasksFixtures() {
    for (const dogTask of dogTasks) {
        try {
            await DogTask.model.create({
                name: dogTask.name,
            });
            console.log(`Created dog task fixture with name: ${dogTask.name}`);
        } catch (error) {
            console.error(error.errmsg);
        }
    }

    console.log('All dog tasks fixtures has been saved');
    process.exit();
}

setDogTasksFixtures();
