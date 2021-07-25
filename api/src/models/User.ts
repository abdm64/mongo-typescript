import mongoose from 'mongoose';
import { Document, Model, model, Schema } from "mongoose";
import { IHobbie } from './Hobbie';

/**
 * Interface to model the User Schema for TypeScript.
 * @param name:string
 * @param id:string
 * @param hobbies:IHobbie[]
 */
export interface IUser extends Document {
  name: string;
  id: string;
  hobbies: IHobbie[]
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  hobbies: { type: mongoose.Schema.Types.ObjectId, ref: 'Hobbie', required: true },

});

const User: Model<IUser> = model("User", userSchema);

export default User;