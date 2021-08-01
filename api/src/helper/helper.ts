import { HobbieModel } from "../models/Hobby";
import User, { IUser } from "../models/User";



export const deleteHobbie =  async (user : IUser, hobbieId  : string) => { 

    var index = user.hobbies.indexOf(hobbieId);
    if (index !== -1) {
        user.hobbies.splice(index, 1);
     return await user.save()
    }

    return

}

export const getNames =  (userHobbies : HobbieModel[]) => { 

  
    return userHobbies.map(({ name }) =>  name)
}