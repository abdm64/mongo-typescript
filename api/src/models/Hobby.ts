
import { Document, Model, model, Schema } from "mongoose";
import { Passion } from "./Passion";

/**
 * Interface to model the User Schema for TypeScript.
 * @param name :string
 * @param passion:Passion
 * @param id:string
 * @param year :number
 */

export interface IHobby extends Document  {
  id  :string
  name: string;
  passion: Passion;
  year : number


}

const hobbySchema: Schema = new Schema({



  name: {
    type: String,
    required: true,
    
  
  },
  
  passion: {
    type: String,
    required: true,
    enum: Passion
  
  },
  
  year: {
    type: Number,
    required: true,
  
  },
 
 

},

{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
   
      delete ret.__v;
    }
  }
});

const Hobby: Model<IHobby> = model("hobby", hobbySchema,"hobbies");

export default Hobby;