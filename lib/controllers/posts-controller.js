const { Router } = require('express');
const { Post } = require('../models/Post');
const authenticate = require('../middleware/authenticate');

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const content = req.body.post;
    const post = await Post.insert({ content, authorId: req.user.id });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
