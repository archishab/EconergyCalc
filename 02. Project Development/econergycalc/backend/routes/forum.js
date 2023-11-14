const express = require("express");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Post = require("../models/Forum");

// ROUTE 1: Add a new post : POST "/api/forum/addpost". Login required
router.post(
  "/addpost",
  fetchuser,
  [body("content", "Content cannot be empty").exists()],
  async (req, res) => {
    try {
      const { content, username } = req.body;

      //if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = new Post({
        content,
        username,
        user: req.user.id,
      });

      const savedPost = await post.save();

      res.json(savedPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Get all posts sorted from oldest to newest : GET "/api/forum/posts"
router.get('/posts', async (req, res) => {
    try {
      // Find all posts and sort them by their creation date in ascending order
      const posts = await Post.find().sort({ timestamp: -1 }); // '1' for ascending order
      res.json(posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
