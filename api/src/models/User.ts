
import { Document, Model, model, Schema, PopulatedDoc } from "mongoose";
import { IHobbie } from './Hobbie';

/**
 * Interface to model the User Schema for TypeScript.
 * @param name:string
 * @param id:string
 * @param hobbies:IHobbie[]
 */
export interface IUser extends Document {
  name: string;
  hobbies: PopulatedDoc<IHobbie & Document>
}

const userSchema: Schema = new Schema({

  
 
 
  name: {
    type: String,
    required: true,
  
  },

  hobbies: [{type: Schema.Types.ObjectId,  ref: 'hobbie',required : true } ]  ,

  

}
,

{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
}
);

const User: Model<IUser> = model("user", userSchema);

export default User;