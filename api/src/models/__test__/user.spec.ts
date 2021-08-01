import assert from "assert";
import User, { IUser } from "../User";
import mongoose from 'mongoose'

describe('USER', () => {
    let joe: IUser 
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
          .then(() => done());
      });


    it('saves a user', (done) => {
        const abdm = new User({ name: 'abdm' });
    
        abdm.save()
          .then(() => {
            // Has abdm been saved successfully?
            assert(!abdm.isNew);
            done();
          });
      });


      
  it('delete  a user',  (done) => {
    joe.remove()
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
    
      assert(user === null);
      done();
    });
      

  });





  it('A model class can update  user',async () => {

    await   User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' })
    const users = await User.find()
    assert(users.length === 1);
    assert(users[0].name === 'Alex');
     
  });

 


})//






 





