import mongoose, { Schema } from 'mongoose';

const quoteSchema = new Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true }
  },
  { versionKey: '_version' }
);

interface Quote extends mongoose.Document {
  name: string;
  text: string;
}

export default mongoose.model<Quote>('Quote', quoteSchema);
