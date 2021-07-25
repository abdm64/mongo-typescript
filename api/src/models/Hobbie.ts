import mongoose from 'mongoose';
import { Document, Model, model, Schema } from "mongoose";
import { Passion } from './Passion';

/**
 * Interface to model the User Schema for TypeScript.
 * @param name :string
 * @param passion:Passion
 * @param id:string
 * @param year :number
 */
export interface IHobbie extends Document {
  name: string;
  passion: Passion;
  id: string;
  year : number
}

const hobbieSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  passion: {
    type: String,
    required: true,
 
  },
 
 year: {
    type: Number,
    required: true,
  
  }
 

});

const Hobbie: Model<IHobbie> = model("Hobbie", hobbieSchema);

export default Hobbie;