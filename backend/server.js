import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Task from './models/task';
import { runInNewContext } from 'vm';

const PORT = 4000;
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tasks');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// Retrieve all tasks in database
router.route('/tasks').get((req, res) => {
    Task.find((err, tasks) => {
        if (err)
            console.log(err);
        else
            res.json(tasks);
    });
});

// Retreive an task by ID in database 
router.route('/tasks/:id').get((req, res) => {
    Task.findById(req.params.id, (err, tasks) => {
        if (err)
            console.log(err);
        else
            res.json(tasks);
    })
});

// Add new task
router.route('/tasks/add').post((req, res) => {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({'task': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

// Update task
router.route('/tasks/update/:id').post((req, res) => {
    // PROVA MED FINDBYIDANDUPDATE
    Task.findById(req.params.id, (err, task) => {
        if (!task)
            return next(new Error('Could not find task'));
        else {
            task.title = req.body.title;
            task.responsible = req.body.responsible;
            task.description = req.body.description;
            task.receiver = req.body.receiver;
            task.status = req.body.status;
            // stored in DB 
            task.save().then(task => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// Delete task
router.route('/tasks/delete/:id').get((req,res) => {
    Task.findByIdAndRemove({_id: req.params.id}, (err, task) => {
        if(err)
            res.json(err);
        else
            res.json('Removed succesfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port ${PORT}`));
