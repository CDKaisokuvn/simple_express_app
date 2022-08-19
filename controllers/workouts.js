const Workout = require("../models/workout");
const mongoose = require("mongoose");
const HttpError = require("../shared/HttpError");

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
      throw new HttpError("Bad Request", 400);
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      throw new HttpError("No such workout", 404);
    }

    return res.status(200).json({ msg: "Sucess", data: workout });
  } catch (error) {
    next(error);
  }
};

// Post a workout
const createWorkout = async (req, res, next) => {
  const { title, load, reps } = req.body;
  console.log(req.user);
  try {
    const workout = await Workout.create({ title, load, reps, user: req.user });

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
      throw new HttpError("Bad Request", 400);
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
      throw new HttpError("Bad Request", 400);
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
