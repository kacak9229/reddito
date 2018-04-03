const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  ownBySubReddit: { type: Schema.Types.ObjectId, ref: 'SubReddit'},
  title: String,
  image: String,
  url: String,
  voteCount: Number,
  comments: [{
    type: Schema.Types.ObjectId, ref: 'Comment',
  }],
  postType: {
      type: Array,
      'default': ["url", "post"]
    }
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
