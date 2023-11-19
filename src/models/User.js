import mongoose from 'mongoose';
import connectToDB from '../lib/db';

const { Schema } = mongoose;
await connectToDB();

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    plaidAccessToken: {
      type: String,
      default: '',
    },
    plaidItemId: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
