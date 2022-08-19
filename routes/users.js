const { Router } = require("express");
const { userLogin, userSignup } = require("../controllers/users");

const router = Router();

//Signup
router.post("/signup", userSignup);

//Login
router.post("/login", userLogin);

module.exports = router;
