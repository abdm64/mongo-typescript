
import { Document, Model, model, Schema, PopulatedDoc } from "mongoose";
import { IHobby } from './Hobby';

/**
 * Interface to model the User Schema for TypeScript.
 * @param name:string
 * @param id:string
 * @param hobbies:IHobby[]
 */
export interface IUser extends Document {
  name: string;
  hobbies: IHobby[]
  removeHobby(id : string): void
}

const userSchema: Schema = new Schema({

  
 
 
  name: {
    type: String,
    required: true,
  
  },

  hobbies: [{type: Schema.Types.ObjectId,  ref: 'hobby',required : true }]   ,

  

}
,

{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  },
}
);

userSchema.methods.removeHobby = async function (id : string) {
  //@ts-ignore
  var index = this.hobbies.indexOf(id);
    if (index !== -1) {
      //@ts-ignore
        this.hobbies.splice(index, 1);
     return await this.save()
    }

    return
  
};



const User: Model<IUser> = model("user", userSchema);

export default User;