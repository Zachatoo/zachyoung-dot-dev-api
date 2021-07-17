const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 128 },
  content: { type: String, required: true, minLength: 32 },
  publishedAt: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

PostSchema.virtual('published').get(function() {
  return this.publishedAt !== undefined;
});

// PostSchema.virtual('publishedAtFormatted').get(function() {
//   return new Intl.DateTimeFormat([], { dateStyle: 'full' }).format(this.publishedAt);
// });

module.exports = mongoose.model('Post', PostSchema);