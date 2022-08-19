const { Router } = require("express");

const Workout = require("../models/workout");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workouts");

const requireAuth = require("../middleware/requireAuth");

const router = Router();

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/create", requireAuth, createWorkout);

router.put("/:id", requireAuth, updateWorkout);

router.delete("/:id", requireAuth, deleteWorkout);

module.exports = router;
