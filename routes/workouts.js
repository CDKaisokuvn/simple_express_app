const { Router } = require("express");

const Workout = require("../models/workout");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workouts");

const router = Router();

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/create", createWorkout);

router.put("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

module.exports = router;
