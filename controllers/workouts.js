const Workout = require("../models/workout");
const mongoose = require("mongoose");

// Get all workouts
const getWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      msg: "Sucess",
      data: workouts,
    });
  } catch (error) {
    next(error);
  }
};

// Get a workouts
const getWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Bad request", data: {} });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ msg: "No such workout", data: {} });
    }

    return res.status(200).json({ msg: "Sucess", data: workout });
  } catch (error) {
    next(error);
  }
};

// Post a workout
const createWorkout = async (req, res, next) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });

    return res.status(201).json({ msg: "Ok", data: workout });
  } catch (error) {
    next(error);
  }
};

// Delete a workouts
const deleteWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "bad request", data: {} });
    }

    await Workout.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Sucess", data: {} });
  } catch (error) {
    next(error);
  }
};

// Update a workout
const updateWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "bad request", data: {} });
    }

    await Workout.findByIdAndUpdate(id, { ...req.body });
    const workout = await Workout.findById(id);
    return res.status(200).json({ msg: "Sucess", data: workout });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
