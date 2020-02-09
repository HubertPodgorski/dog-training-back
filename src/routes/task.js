const express = require('express');
const router = express.Router();
const Task = require('../models/task');

const routes = {
    get: {
        tasks: '/tasks'
    },
    delete: {
        tasks: '/tasks/:id'
    },
    post: {
        tasks: '/tasks'
    },
    put: {
        tasks: '/tasks/:id',
        updateOrder: '/tasks/order',
        updateTaskDogs: '/tasks/:id/dogs',
        updateTaskDescription: '/tasks/:id/description',
        updatePeopleTasks: '/tasks/:id/people-tasks',
        updateDogTasks: '/tasks/:id/dog-tasks'
    }
};

// get list of tasks
router.get(routes.get.tasks, (req, res) => {
    Task.model.find({}, (err, tasks) => {
        const mappedTasks = tasks
            .map(task => ({
                id: task.id,
                dogs: task.dogs,
                description: task.description || '',
                order: task.order,
                tasks: task.tasks || [],
                peopleTasks: task.peopleTasks.map(personTask => ({
                    uuid: personTask.uuid,
                    personId: personTask.personId,
                    taskId: personTask.taskId,
                    personName: personTask.personName,
                    taskName: personTask.taskName
                }))
            }))
            .sort((a, b) => a.order - b.order);

        if (err) res.send(err).status(500);

        res.send(mappedTasks).status(200);
    });
});

// add task
// router.post(routes.post.trainingDogs, (req, res) => {
//     res.end();
// });


// update task order
router.put(routes.put.updateOrder, async (req, res) => {
    const promises = req.body.map(dogOrderWithIdPair =>
        Task.model.updateOne(
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

// update task description
router.put(routes.put.updateTaskDescription, async (req, res) => {
    try {
        const response = await Task.model.updateOne(
            { _id: req.params.id },
            { $set: { description: req.body.description } }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

// update task dogs
router.put(routes.put.updateTaskDogs, async (req, res) => {
    try {
        const response = await Task.model.updateOne(
            { _id: req.params.id },
            { $set: { dogs: req.body.dogs } }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.put(routes.put.updatePeopleTasks, async (req, res) => {
    try {
        const response = await Task.model.updateOne(
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
        const response = await Task.model.updateOne(
            { _id: req.params.id },
            { $set: { tasks: req.body.tasks } }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

module.exports = router;
