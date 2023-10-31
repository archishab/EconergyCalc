const express = require('express');
const { body, query, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();


// Create a user using: POST "/api/auth/"
router.post('/', [
    body('username', 'Username cannot be empty').isLength({ min: 1 }),
    body('email', 'Email must be valid').isEmail(),
    body('password', 'Password must be more than 5 characters').isLength({ min: 5 })
],(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
    .catch(err=>{console.log(err)
    res.json({error: 'Please enter a unique value for email and username', message: err.message})});
});

module.exports = router;