const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/task",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})
.then(() => console.log("Connected to DB"))
.catch(console.error)

const Task = require("./models/Task");

app.get('/', async (req, res)  => {
    const tasks = await Task.find();
    res.json(tasks)
})

app.post('/create', async (req, res) => {
    const task = new Task({
        text: req.body.text,
    });
    await task.save()
    res.json(task)
})

app.delete("/delete/:id", async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json(task);
})

app.put("/complete/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.complete = !task.complete;
    await task.save();
    res.json(task);
})

app.listen(8080, () => console.log("Server Started on Port 8080"));