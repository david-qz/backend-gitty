const { Router } = require('express');
const { Post } = require('../models/Post');
const authorize = require('../middleware/authorize');

const router = Router();

router.get('/', authorize, async (req, res, next) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
