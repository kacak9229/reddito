var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  ownBySubRedditPost: { type: Schema.Types.ObjectId, ref: 'Post'},
  textBody: String,
  created: { type: Date, default: Date.now },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Comment', CommentSchema);
