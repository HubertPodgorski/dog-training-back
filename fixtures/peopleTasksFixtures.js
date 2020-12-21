require('dotenv').config();
const mongoose = require('mongoose');
const PersonTask = require('../src/models/personTask');
const { dbUrl } = require('../src/helpers');

mongoose.connect(dbUrl);

const peopleTasks = [
    {
        name: 'Box'
    },
    {
        name: 'Marker'
    },
    {
        name: 'Kroczek'
    },
    {
        name: 'Ustawienie toru'
    },
    {
        name: 'Królowa szarpaka'
    },
    {
        name: 'Puszczanie psów'
    },
    {
        name: 'Runner'
    },
    {
        name: 'Yes man'
    },
    {
        name: 'Praca ze swoim psem'
    },
    {
        name: 'Zbieranie piłek'
    },
    {
        name: 'Mierzenie czasów'
    },
    {
        name: 'Coach’s Eye'
    },
    {
        name: 'Zdjęcia/filmiki na fp'
    },
    {
        name: 'Asysta przy hopce'
    },
    {
        name: 'Pokazywanie piłki'
    }
];

async function setPeopleTasksFixtures() {
    for (const personTask of peopleTasks) {
        try {
            await PersonTask.model.create({
                name: personTask.name
            });
            console.log(
                `Created person task fixture with name: ${personTask.name}`
            );
        } catch (error) {
            console.error(error.errmsg);
        }
    }

    console.log('All people tasks fixtures has been saved');
    process.exit();
}

setPeopleTasksFixtures();
