const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");

const workoutRoutes = require("./routes/workouts");

const app = express();

const port = process.env.PORT || 4000;
const uri = process.env.DB_URI;

console.log(uri);
mongoose.connect(uri).then(() => {
  console.log("Connected to database");
  app.listen(port, console.log(`Listening on port ${port}`));
});
app.use(morgan("dev"));

app.use(express.json());
app.use("/api/workouts", workoutRoutes);

app.use((req, res, next) => {
  const err = { msg: "Not Found", code: 404 };
  next(err);
});

app.use((err, req, res, next) => {
  if (!err.code) {
    return res.status(500).json({ msg: err.msg });
  }
  return res.status(404).json(err);
});
