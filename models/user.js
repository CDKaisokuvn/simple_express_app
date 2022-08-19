const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const HttpError = require("../shared/HttpError");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  // Make sure that the user does not already exist
  const exists = await this.findOne({ email });

  if (exists) {
    throw new HttpError("User already exists", 400);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  //Validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  //Verify
  const user = await this.findOne({ email });

  if (!user) {
    throw new HttpError("Incorrect email", 400);
  }

  const match = await bcrypt.compare(password, user.password);
  return match;
};
module.exports = mongoose.model("User", userSchema);
