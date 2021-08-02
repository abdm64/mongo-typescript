import { IHobby } from "../models/Hobby";
import User, { IUser } from "../models/User";




export const getNames =  (userHobbies : IHobby[]) => { 

  
    return userHobbies.map(({ name }) =>  name)
}