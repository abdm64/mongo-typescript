import assert from "assert";
import User, { IUser } from "../User";
import Hobbie , { IHobbie , HobbieModel } from "../Hobby";


describe('Hobbie Model', () => {
    let joe: IUser 
    let football : IHobbie
    beforeEach(async () => {
        joe = new User({ name: 'Joe' });
        football = new Hobbie({ name: 'Football', passion: 'Medium', year: 2010   })
        joe.hobbies.push(football)
        await joe.save()
        await football.save()
      });

      it('saves a relation between a user and hobbies ', async () => {
      const user = await User.findOne({ name: 'Joe' }).populate('hobbies')
      if (user){ 
        assert(user.hobbies[0].name === 'Football');
       }
      
         
      });  


    


      
 
      

  });//






 









 





