import mongoose from 'mongoose';
import { isValidEmail } from '../utils';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 64,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 64,
  },
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

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.set('toJSON', { virtuals: true });

export const UserModel = model('User', UserSchema);