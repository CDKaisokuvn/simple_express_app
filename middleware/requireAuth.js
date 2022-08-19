const HttpError = require("../shared/HttpError");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  try {
    // verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpError("Authorization token required", 401);
    }

    const token = authorization.split(" ")[1];

    const userData = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(userData._id).select("_id");
    req.user = user;
    next();
  } catch (error) {
    next(new HttpError("Request is not authorized", 401));
  }
};

module.exports = requireAuth;
