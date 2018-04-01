var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Review', ReviewSchema);
