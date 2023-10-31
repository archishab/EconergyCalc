const express = require("express");
const bcrypt = require('bcryptjs');
const { body, query, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

// Create a user using: POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("username", "Username cannot be empty").isLength({ min: 1 }),
    body("email", "Email must be valid").isEmail(),
    body("password", "Password must be more than 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "User with this email already exists. Please log in.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);
      //create new user in db
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: securedPassword,
      });
      res.json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
