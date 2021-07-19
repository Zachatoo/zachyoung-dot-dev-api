import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 128 },
  content: { type: String, required: true },
  published: { type: Boolean, required: true, default: false },
  publishedAt: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// PostSchema.virtual('publishedAtFormatted').get(function() {
//   return new Intl.DateTimeFormat([], { dateStyle: 'full' }).format(this.publishedAt);
// });

PostSchema.set('toJSON', { virtuals: true });

export const PostModel = model('Post', PostSchema);