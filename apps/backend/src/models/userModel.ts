import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  counter: number;
  rewards: number;
  username: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String },
  counter: { type: Number, default: 0 },
  rewards: { type: Number, default: 0 },
});

export const User = model<IUser>('User', userSchema);
