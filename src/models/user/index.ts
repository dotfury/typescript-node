import mongoose, { Schema } from 'mongoose';

import User from '../../interfaces/user';

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { versionKey: '_version', timestamps: true }
);

export default mongoose.model<User>('User', userSchema);
