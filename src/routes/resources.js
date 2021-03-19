const express = require('express');
const router = express.Router();
const Dog = require('../models/dog');
const DogTask = require('../models/dogTask');
const Person = require('../models/person');
const PersonTask = require('../models/personTask');
const { getDogTasks } = require('../repository/dogTasks');
const {
    getPeople,
    addPerson,
    deletePersonById,
} = require('../repository/people');
const { getDogs } = require('../repository/dogs');
const { getPeopleTasks } = require('../repository/peopleTasks');

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

router.get(routes.get.dogs, async (req, res) => {
    const response = await getDogs();

    res.send(response).status(200);
});

router.get(routes.get.dogTasks, async (req, res) => {
    const response = await getDogTasks();

    res.send(response).status(200);
});

router.get(routes.get.people, (req, res) => {
    const response = getPeople();

    res.send(response).status(200);
});

router.get(routes.get.peopleTasks, async (req, res) => {
    const response = await getPeopleTasks();

    res.send(response).status(200);
});

router.get(routes.get.all, async (req, res) => {
    const dogs = await getDogs();
    const dogTasks = await getDogTasks();
    const people = await getPeople();
    const peopleTasks = await getPeopleTasks();

    res.send({
        dogs,
        dogTasks,
        people,
        peopleTasks,
    }).status(200);
});

router.delete(routes.delete.people, async (req, res) => {
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

    res.send({}).status(200);

    // await deletePersonById(req.params.id)();
    //
    // res.send({}).status(200);
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

router.post(routes.post.people, async (req, res) => {
    try {
        const response = await addPerson(req.body.name || '')();

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
