var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  description: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', ReviewSchema);
