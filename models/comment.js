import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  message: { type: String, required: true, minLength: 3 },
  author: { type: String, required: true, minLength: 1 },
}, { timestamps: true });

export const CommentModel = model('Comment', CommentSchema);