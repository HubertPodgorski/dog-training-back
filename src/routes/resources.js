const express = require('express');
const router = express.Router();
const Dog = require('../models/dog');
const DogTask = require('../models/dogTask');
const Person = require('../models/person');
const PersonTask = require('../models/personTask');

const routes = {
    get: {
        dogs: '/dogs',
        dogTasks: '/dog-tasks',
        people: '/people',
        peopleTasks: '/people-tasks',
        all: '/all'
    }
};

router.get(routes.get.dogs, (req, res) => {
    Dog.model.find({}, (err, dogs) => {
        const mappedDogs = dogs.map(dog => ({
            id: dog.id,
            name: dog.name
        }));

        if (err) res.send(err).status(500);

        res.send(mappedDogs).status(200);
    });
});

router.get(routes.get.dogTasks, (req, res) => {
    DogTask.model.find({}, (err, dogTasks) => {
        const mappedDogTasks = dogTasks.map(dogTask => ({
            id: dogTask.id,
            name: dogTask.name
        }));

        if (err) res.send(err).status(500);

        res.send(mappedDogTasks).status(200);
    });
});

router.get(routes.get.people, (req, res) => {
    Person.model.find({}, (err, people) => {
        const mappedPeople = people.map(person => ({
            id: person.id,
            name: person.name
        }));

        if (err) res.send(err).status(500);

        res.send(mappedPeople).status(200);
    });
});

router.get(routes.get.peopleTasks, (req, res) => {
    PersonTask.model.find({}, (err, people) => {
        const mappedPeopleTasks = people.map(person => ({
            id: person.id,
            name: person.name
        }));

        if (err) res.send(err).status(500);

        res.send(mappedPeopleTasks).status(200);
    });
});

router.get(routes.get.all, async (req, res) => {
    let allResources = {
        dogs: [],
        dogTasks: [],
        people: [],
        peopleTasks: []
    };

    await Dog.model.find({}, (err, dogs) => {
        const mappedDogs = dogs.map(dog => ({
            id: dog.id,
            name: dog.name
        }));

        if (err) res.send(err).status(500);

        allResources.dogs = mappedDogs;
    });

    await DogTask.model.find({}, (err, dogTasks) => {
        const mappedDogTasks = dogTasks.map(dogTask => ({
            id: dogTask.id,
            name: dogTask.name
        }));

        if (err) res.send(err).status(500);

        allResources.dogTasks = mappedDogTasks;
    });

    await Person.model.find({}, (err, people) => {
        const mappedPeople = people.map(person => ({
            id: person.id,
            name: person.name
        }));

        if (err) res.send(err).status(500);

        allResources.people = mappedPeople;
    });

    await PersonTask.model.find({}, (err, people) => {
        const mappedPeopleTasks = people.map(person => ({
            id: person.id,
            name: person.name
        }));

        if (err) res.send(err).status(500);

        allResources.peopleTasks = mappedPeopleTasks;
    });

    res.send(allResources).status(200);
});

module.exports = router;
