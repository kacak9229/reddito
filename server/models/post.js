const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  votes: [{
    type: Schema.Types.ObjectId, ref: 'Vote'
  }],
  comments: [{
    type: Schema.Types.ObjectId, ref: 'Comment',
  }],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
