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
        all: '/all',
    },
    delete: {
        people: '/people/:id',
        dogTasks: '/dog-tasks/:id',
        dogs: '/dogs/:id',
        peopleTasks: '/people-tasks/:id',
    },
    post: {
        people: '/people',
        dogTasks: '/dog-tasks',
        dogs: '/dogs',
        peopleTasks: '/people-tasks',
    },
};

router.get(routes.get.dogs, (req, res) => {
    Dog.model.find({}, (err, dogs) => {
        const mappedDogs = dogs.map((dog) => ({
            id: dog.id,
            name: dog.name,
        }));

        if (err) res.send(err).status(500);

        res.send(mappedDogs).status(200);
    });
});

router.get(routes.get.dogTasks, (req, res) => {
    DogTask.model.find({}, (err, dogTasks) => {
        const mappedDogTasks = dogTasks.map((dogTask) => ({
            id: dogTask.id,
            name: dogTask.name,
        }));

        if (err) res.send(err).status(500);

        res.send(mappedDogTasks).status(200);
    });
});

router.get(routes.get.people, (req, res) => {
    Person.model.find({}, (err, people) => {
        const mappedPeople = people.map((person) => ({
            id: person.id,
            name: person.name,
        }));

        if (err) res.send(err).status(500);

        res.send(mappedPeople).status(200);
    });
});

router.get(routes.get.peopleTasks, (req, res) => {
    PersonTask.model.find({}, (err, people) => {
        const mappedPeopleTasks = people.map((person) => ({
            id: person.id,
            name: person.name,
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
        peopleTasks: [],
    };

    await Dog.model.find({}, (err, dogs) => {
        const mappedDogs = dogs.map((dog) => ({
            id: dog.id,
            name: dog.name,
        }));

        if (err) res.send(err).status(500);

        allResources.dogs = mappedDogs;
    });

    await DogTask.model.find({}, (err, dogTasks) => {
        const mappedDogTasks = dogTasks.map((dogTask) => ({
            id: dogTask.id,
            name: dogTask.name,
        }));

        if (err) res.send(err).status(500);

        allResources.dogTasks = mappedDogTasks;
    });

    await Person.model.find({}, (err, people) => {
        const mappedPeople = people.map((person) => ({
            id: person.id,
            name: person.name,
        }));

        if (err) res.send(err).status(500);

        allResources.people = mappedPeople;
    });

    await PersonTask.model.find({}, (err, people) => {
        const mappedPeopleTasks = people.map((person) => ({
            id: person.id,
            name: person.name,
        }));

        if (err) res.send(err).status(500);

        allResources.peopleTasks = mappedPeopleTasks;
    });

    res.send(allResources).status(200);
});

router.delete(routes.delete.people, (req, res) => {
    try {
        Person.model.deleteOne({ _id: req.params.id }, (callback) => {
            if (callback) {
                res.send(callback).status(400);
            }

            res.send({}).status(200);
        });
    } catch (error) {
        res.send(error).status(500);
    }
});

router.delete(routes.delete.dogs, (req, res) => {
    try {
        Dog.model.deleteOne({ _id: req.params.id }, (callback) => {
            if (callback) {
                res.send(callback).status(400);
            }

            res.send({}).status(200);
        });
    } catch (error) {
        res.send(error).status(500);
    }
});

router.delete(routes.delete.peopleTasks, (req, res) => {
    try {
        PersonTask.model.deleteOne({ _id: req.params.id }, (callback) => {
            if (callback) {
                res.send(callback).status(400);
            }

            res.send({}).status(200);
        });
    } catch (error) {
        res.send(error).status(500);
    }
});

router.delete(routes.delete.dogTasks, (req, res) => {
    try {
        DogTask.model.deleteOne({ _id: req.params.id }, (callback) => {
            if (callback) {
                res.send(callback).status(400);
            }

            res.send({}).status(200);
        });
    } catch (error) {
        res.send(error).status(500);
    }
});

router.post(routes.post.people, (req, res) => {
    try {
        const { name } = req.body;
        const response = Person.model.create({
            name: name || '',
        });

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.post(routes.post.peopleTasks, (req, res) => {
    try {
        const { name } = req.body;
        const response = PersonTask.model.create({
            name: name || '',
        });

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.post(routes.post.dogs, (req, res) => {
    try {
        const { name } = req.body;
        const response = Dog.model.create({
            name: name || '',
        });

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.post(routes.post.dogTasks, (req, res) => {
    try {
        const { name } = req.body;
        const response = DogTask.model.create({
            name: name || '',
        });

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

module.exports = router;
