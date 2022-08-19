const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");
const HttpError = require("./shared/HttpError");

const app = express();

const port = process.env.PORT || 4000;
const uri = process.env.DB_URI;

mongoose.connect(uri).then(() => {
  console.log("Connected to database");
  app.listen(port, console.log(`Listening on port ${port}`));
});

//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Router
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const err = new HttpError("Not Found", 404);

  next(err);
});

app.use((err, req, res, next) => {
  if (!err.code) {
    return res.status(500).json({ msg: err.message });
  }
  return res.status(err.code).json({ msg: err.message });
});
