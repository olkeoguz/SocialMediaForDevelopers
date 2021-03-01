const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all the posts
// @access   Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('ServerError');
  }
});

// @route    GET api/posts/:post_id
// @desc     Get a post by id
// @access   Private

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found!' });
    }
    res.status(500).send('ServerError');
  }
});

// @route    DELETE api/posts/:post_id
// @desc     Delete a post
// @access   Private

router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' });
    }

    //Check if user owns the post

    if (post.user.toString() !== req.user.id) {
      // post.user is a ObjectId
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post Removed!' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found!' });
    }
    res.status(500).send('ServerError');
  }
});

// @route    PUT api/posts/like/:post_id
// @desc     Like a post
// @access   Private

router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Check if the post has already been liked by this user

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'You already liked this post.' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('ServerError');
  }
});

// @route    PUT api/posts/unlike/:post_id
// @desc     Unlike a post
// @access   Private

router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Check if the post has been liked by this user. Or else not allowed to unlike

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    const removeIndex = post.likes.findIndex(
      (like) => like.user.toString() === req.user.id
    );
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('ServerError');
  }
});

// @route    POST api/posts/comment/:post_id
// @desc     Comment on a post
// @access   Private

router.post(
  '/comment/:post_id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.post_id);

      post.comments.unshift({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('ServerError');
    }
  }
);

// @route    DELETE api/posts/comment/:post_id/:comment_id
// @desc     Delete comment
// @access   Private

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    //check user owns the comment

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized!' });
    }

    const removeIndex = post.comments.findIndex(
      (comment) => comment.id === req.params.comment_id
    );

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('ServerError');
  }
});

module.exports = router;
