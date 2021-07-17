const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: { type: String, required: true, minLength: 3 },
  publishedAt: { type: Date, required: true, default: new Date() },
  author: { type: String, required: true, minLength: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);