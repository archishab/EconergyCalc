const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, query, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();

const JWT_SECRET = "secretkey";

// ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("username", "Username cannot be empty").isLength({ min: 1 }),
    body("email", "Email must be valid").isEmail(),
    body("password", "Password must be more than 5 characters").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "User with this email already exists. Please log in.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);
      //create new user in db
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
        password: securedPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);

      //   res.json({ user });
      success=true;
      res.json({success, authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Email must be valid").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success, error: "Please try to login in with the correct credentials",
        });
      }

      const passwrodCompare = await bcrypt.compare(password, user.password);
      if (!passwrodCompare) {
        success=false;
        return res.status(400).json({
          success, error: "Please try to login in with the correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      let userId = user.id;
      let username = user.username;
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken, userId, username});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get loggedin user details: POST "/api/auth/getuser". Login required
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {


    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
