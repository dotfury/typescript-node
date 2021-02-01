import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { versionKey: '_version', timestamps: true }
);

interface User extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}

export default mongoose.model<User>('User', userSchema);
