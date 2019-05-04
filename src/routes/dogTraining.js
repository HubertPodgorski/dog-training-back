const express = require('express');
const router = express.Router();
const DogTraining = require('../models/dogTraining');

const routes = {
    get: {
        trainingDogs: '/training-dogs'
    },
    delete: {
        trainingDogs: '/training-dogs/:id'
    },
    post: {
        trainingDogs: '/training-dogs'
    },
    put: {
        trainingDogs: '/training-dogs/:id',
        updateOrder: '/training-dogs/order',
        updatePeopleData: '/training-dogs/:id/people-data',
        updateDogTasks: '/training-dogs/:id/tasks'
    }
};

// get list of dogs in trainng
router.get(routes.get.trainingDogs, (req, res) => {
    DogTraining.find({}, (err, dogsInTraining) => {
        const mappedDogsInTraining = dogsInTraining.map(dogTraining => ({
            id: dogTraining.id,
            dogName: dogTraining.dogName,
            trainingDescription: dogTraining.trainingDescription || ''
        }));

        if (err) res.send(error).status(500);

        res.send(mappedDogsInTraining).status(200);
    });
});

// add dog to training
router.post(routes.post.trainingDogs, (req, res) => {
    res.end();
});

router.put(routes.put.trainingDogs, (req, res) => {
    res.end();
});

router.put(routes.put.updateOrder, (req, res) => {
    res.end();
});

router.put(routes.put.updatePeopleData, (req, res) => {
    res.end();
});

router.put(routes.put.updateDogTasks, (req, res) => {
    res.end();
});

// delete dog from training / ID
router.delete(routes.delete.trainingDogs, (req, res) => {
    res.end();
});

module.exports = router;
