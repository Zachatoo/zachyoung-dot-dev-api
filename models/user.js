import mongoose from 'mongoose';
import { isValidEmail } from '../helpers';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    maxLength: 128,
    unique: true,
    validate: [isValidEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    maxLength: 128
  },
}, { timestamps: true });

export const UserModel = model('User', UserSchema);