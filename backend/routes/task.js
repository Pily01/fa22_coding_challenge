const Task = require("../models/Task");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const tasks = await Task.find();
      res.send(tasks);
    } catch (error) {
      res.send(error);
    }
  });