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
        updateTrainingDescription: '/training-dogs/:id/training-description',
        updatePeopleTasks: '/training-dogs/:id/people-tasks',
        updateDogTasks: '/training-dogs/:id/dog-tasks',
        updateDogDisability: '/training-dogs/:id/dog-disability'
    }
};

// get list of dogs in trainng
router.get(routes.get.trainingDogs, (req, res) => {
    DogTraining.find({}, (err, dogsInTraining) => {
        const mappedDogsInTraining = dogsInTraining
            .map(dogTraining => ({
                id: dogTraining.id,
                dogName: dogTraining.dogName,
                trainingDescription: dogTraining.trainingDescription || '',
                order: dogTraining.order,
                dogTasks: dogTraining.dogTasks || [],
                peopleTasks: dogTraining.peopleTasks.map(personTask => ({
                    uuid: personTask.uuid,
                    personId: personTask.personId,
                    taskId: personTask.taskId
                })),
                isDisabled: dogTraining.isDisabled || false
            }))
            .sort((a, b) => a.order - b.order);

        if (err) res.send(error).status(500);

        res.send(mappedDogsInTraining).status(200);
    });
});

// add dog to training
// router.post(routes.post.trainingDogs, (req, res) => {
//     res.end();
// });

// router.put(routes.put.trainingDogs, (req, res) => {
//     res.end();
// });

router.put(routes.put.updateOrder, async (req, res) => {
    const promises = req.body.map(dogOrderWithIdPair =>
        DogTraining.updateOne(
            { _id: dogOrderWithIdPair.id },
            { $set: { order: dogOrderWithIdPair.order } }
        )
    );

    try {
        await Promise.all(promises);

        res.send(req.body).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.put(routes.put.updateTrainingDescription, async (req, res) => {
    try {
        const response = await DogTraining.updateOne(
            { _id: req.params.id },
            { $set: { trainingDescription: req.body.trainingDescription } }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.put(routes.put.updatePeopleTasks, async (req, res) => {
    try {
        const response = await DogTraining.updateOne(
            { _id: req.params.id },
            { $set: { peopleTasks: req.body.peopleTasks } }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.put(routes.put.updateDogTasks, async (req, res) => {
    try {
        const response = await DogTraining.updateOne(
            { _id: req.params.id },
            { $set: { dogTasks: req.body.dogTasks } }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.put(routes.put.updateDogDisability, async (req, res) => {
    try {
        const response = await DogTraining.updateOne(
            { _id: req.params.id },
            { $set: { isDisabled: req.body.isDisabled } }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

module.exports = router;
