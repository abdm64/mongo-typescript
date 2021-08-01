
import { Document, Model, model, Schema } from "mongoose";
import { Passion } from "./Passion";

/**
 * Interface to model the User Schema for TypeScript.
 * @param name :string
 * @param passion:Passion
 * @param id:string
 * @param year :number
 */
export interface IHobbie extends Document {


  hobbies : HobbieModel[]
 
}
export interface HobbieModel extends Document  {

  name: string;
  passion: Passion;
  year : number


}

const hobbieSchema: Schema = new Schema({



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
      delete ret.password;
      delete ret.__v;
    }
  }
});

const Hobbie: Model<IHobbie> = model("hobbie", hobbieSchema);

export default Hobbie;