
import { Document, Model, model, Schema, PopulatedDoc } from "mongoose";
import { IHobby } from './Hobby';

/**
 * Interface to model the User Schema for TypeScript.
 * @param name:string
 * @param id:string
 * @param hobbies:IHobbie[]
 */
export interface IUser extends Document {
  name: string;
  hobbies: PopulatedDoc<IHobby & Document>
}

const userSchema: Schema = new Schema({

  
 
 
  name: {
    type: String,
    required: true,
  
  },

  hobbies: [{type: Schema.Types.ObjectId,  ref: 'hobby',required : true } ]  ,

  

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