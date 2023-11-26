const express = require("express");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Post = require("../models/Forum");
const User = require("../models/User");

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
        upVote: 0,
        downVote: 0
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

// ROUTE 3: Like a post : POST "/api/forum/likepost/:id". Login required
router.post('/likepost/:id', fetchuser, async (req, res) => {
  try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ error: "Post not found" });
      }
      post.upVote = (post.upVote || 0) + 1;
      await post.save();

      // Increment user points
      const author = await User.findById(post.user);
      author.points = (author.points || 0) + 1;
      await author.save();

      res.json(post);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Dislike a post : POST "/api/forum/dislikepost/:id". Login required
router.post('/dislikepost/:id', async (req, res) => {
  try {
      const postId = req.params.id;

      // Find the post by id and increment the downVote
      let post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ error: "Post not found" });
      }

      post.downVote = (post.downVote || 0) + 1; // Initialize downVote if it doesn't exist
      await post.save();
      res.json(post);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
});


// ROUTE 5: Get loggedin user details: POST "/api/forum/leaderboard". Login required
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.find({}).sort({ points: -1 }).limit(10); // Adjust limit as needed
    res.json(leaderboard);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 6: Reply to a post : POST "/api/forum/replytopost/:id". Login required
router.post('/replytopost/:id', fetchuser, [body('content', 'Content cannot be empty').exists()], async (req, res) => {
  try {
    const { content, username } = req.body;
    const postId = req.params.id;

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the post and add a reply
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const reply = {
      content,
      user: req.user.id,
      username: username,
    };

    post.replies.push(reply);
    await post.save();

    res.json(reply);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
