var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubRedditSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  name: { type: String, unique: true, lowercase: true },
  image: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SubReddit', SubRedditSchema);
