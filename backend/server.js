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

app.listen(8080, () => console.log("Server Started on Port 8080"));