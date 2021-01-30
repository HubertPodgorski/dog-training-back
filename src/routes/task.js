const express = require('express');
const router = express.Router();
const Task = require('../models/task');

const routes = {
    get: {
        tasks: '/tasks',
    },
    delete: {
        tasks: '/tasks/:id',
    },
    post: {
        tasks: '/tasks',
    },
    put: {
        tasks: '/tasks/:id',
        updateOrder: '/tasks/order',
        updateTaskDogs: '/tasks/:id/dogs',
        updateTaskDescription: '/tasks/:id/description',
        updatePeopleTasks: '/tasks/:id/people-tasks',
        updateDogTasks: '/tasks/:id/dog-tasks',
        updateTaskOrder: '/tasks/:id/order',
        updateTaskColumn: '/tasks/:id/column',
    },
};

// get list of tasks
router.get(routes.get.tasks, (req, res) => {
    Task.model.find({}, (err, tasks) => {
        const mappedTasks = tasks
            .map((task) => ({
                id: task.id,
                dogs: task.dogs.map((dog) => ({ name: dog.name, id: dog.id })),
                description: task.description || '',
                order: task.order,
                tasks:
                    task.tasks.map((task) => ({
                        id: task.id,
                        name: task.name,
                    })) || [],
                peopleTasks: task.peopleTasks.map((personTask) => ({
                    uuid: personTask.uuid,
                    personId: personTask.personId,
                    taskId: personTask.taskId,
                    personName: personTask.personName,
                    taskName: personTask.taskName,
                })),
                column: task.column,
            }))
            .sort((a, b) => a.order - b.order);

        if (err) res.send(err).status(500);

        res.send(mappedTasks).status(200);
    });
});

// add task
router.post(routes.post.tasks, (req, res) => {
    try {
        const { dogs, description, order, tasks, peopleTasks } = req.body;
        const response = Task.model.create({
            dogs: dogs || [],
            description: description || '',
            order: order,
            tasks: tasks || [],
            peopleTasks: peopleTasks || [],
            column: 'left',
        });

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

// delete task
router.delete(routes.delete.tasks, (req, res) => {
    try {
        Task.model.deleteOne({ _id: req.params.id }, (callback) => {
            if (callback) {
                res.send(callback).status(400);
            }

            res.send({}).status(200);
        });
    } catch (error) {
        res.send(error).status(500);
    }
});

// update whole task
// router.put(routes.put.tasks, (req, res) => {
//     res.end();
// });

// update task order
router.put(routes.put.updateOrder, async (req, res) => {
    const promises = req.body.map((dogOrderWithIdPair) =>
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
            {
                $set: {
                    dogs: req.body.dogs.map((dog) => ({
                        name: dog.name,
                        _id: dog.id,
                    })),
                },
            }
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
            {
                $set: {
                    tasks: req.body.tasks.map((task) => ({
                        _id: task.id,
                        name: task.name,
                    })),
                },
            }
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
            {
                $set: {
                    peopleTasks: req.body.peopleTasks.map((personTask) => ({
                        ...personTask,
                        _id: personTask.id,
                    })),
                },
            }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.put(routes.put.updateTaskOrder, async (req, res) => {
    try {
        const response = await Task.model.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    order: +req.body.order,
                    column: req.body.column,
                },
            }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

router.put(routes.put.updateTaskColumn, async (req, res) => {
    try {
        const response = await Task.model.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    column: req.body.column,
                },
            }
        );

        res.send(response).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
});

module.exports = router;
