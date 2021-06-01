const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  deletTask,
  delteAllTask,
} = require("../controllers/task.controller");

router.get("/allTasks", getAllTasks);
router.post("/createTask", createNewTask);
router.patch("/updateTask", changeTaskInfo);
router.delete("/deleteTask", deletTask);
router.delete("/deleteAllTasks", delteAllTask);

module.exports = router;
