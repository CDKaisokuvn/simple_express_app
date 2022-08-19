const User = require("../models/user");
const jwt = require("jsonwebtoken");

const HttpError = require("../shared/HttpError");

const secretKey = process.env.SECRET_KEY;
const createToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "3d" });
};
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const match = await User.login(email, password);

    if (!match) {
      throw new HttpError("Email or password is not correct", 401);
    }

    const user = await User.findOne({ email });
    const userData = user.toObject();

    const token = createToken(userData);
    return res.status(200).json({ msg: "User signed", data: userData, token });
  } catch (error) {
    next(error);
  }
};

const userSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.signup(email, password);
    const userData = user.toObject();
    delete userData.password;

    const token = createToken(userData);

    return res.status(200).json({ msg: "User signed", data: userData, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { userLogin, userSignup };
