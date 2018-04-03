const router = require('express').Router();
const redis = require('redis'); d
/* MODELS */
const User = require('../models/user');
const SubReddit = require('../models/subreddit');
const Post = require('../models/post');

const client = redis.createClient({
    host: "127.0.0.1",
    port: 6379
});

// Will get the top votes and will use Redis ---> BEST or New Version 1.0
router.get('/', (req, res, next) => {

  const perPage = 25;
  const page = req.query.page;

  Post
    .find({})
    .sort({ voteCount: req.query.voteCount }) // descending order
    .skip( perPage * page )
    .limit( perPage ) // limit the number of item per page -> 25
    .populate('ownBySubReddit') // populate the subreddit
    .exec((err, posts) => {

      // Use redis to fasten things up // cache // next stage
      if (err) {
        res.json(err)
      } else {
        res.json({
          success: true,
          status: 'OK',
          message: 'List of reddit',
          posts
        });
      }
    });
});

// Will get the top votes and will use Redis ---> BEST or New Version 2.0
router.get('/api/', (req, res, next) => {

  const perPage = 25;
  const page = req.query.page;

  User
    .findOne({ _id: req.decoded.user._id })
    .sort({ voteCount: req.query.voteCount }) // descending order
    .skip( perPage * page )
    .limit( perPage ) // limit the number of item per page -> 25
    .populate('subscribed') // populate the subreddit
    .exec((err, posts) => {

      // Use redis to fasten things up // cache // next stage
      if (err) {
        res.json(err)
      } else {
        res.json({
          success: true,
          status: 'OK',
          message: 'List of reddit',
          posts
        });
      }
    });
});


// SubReddit URL // Use Redis LATER for caching AFTER TESTING
router.get('/r/:subredditname', (req, res, next) => {
  Post.find({ name: req.params.subredditname }, (err, posts) => {

    if (err) {
      res.json(err)
    } else {
      res.json({
        success: true,
        status: 'OK',
        message: 'List of reddit',
        posts
      });
    }
  });
});

// Single Post with comments
router.get('/r/:subredditname/comments/:id', (req, res, next) => {

  async.parallel([
    function(callback) {
      Post.findOne({ _id: req.params.id }, (err, post) => {
        callback(err, post)
      })
    },
    function(post) {
      Comment
        .find({ ownBySubRedditPost: req.params.id })
        .sort({ vote: -1 })
        .populate('owner')
        .exec((err, comments) => {
          callback(err, comments)
        })
    }
  ], function(err, results) {
    const post = results[0];
    const comments = results[1];

    res.json({
      success: true,
      status: 'OK',
      post,
      comments
    });

  });
});


module.exports = router;
