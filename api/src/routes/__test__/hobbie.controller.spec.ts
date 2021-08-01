import request from 'supertest';
import { app } from '../../app';




  
  describe('hobby routes', () => {
    it('get hobbies by user id', async () => {
      
      let res =  await request(app)
        .post('/api/v1/user')
        .send({
          name: 'abdm',
          hobby:{
              passion : "Low",
              year: 2013,
              name: "gaming" 
          }
        })
      let userId = res.body.id
      //get hobbies array by userId
      let userResponse  = await  request(app).get(`/api/v1/hobby/${userId}`)
      
      let userHobbies = userResponse.body
      console.log(userHobbies)
      expect(Array.isArray(userHobbies)).toBe(true)
      expect(userHobbies[0].name).toBe('gaming')
    });


    it('update  hobby by user id', async () => {
      
      let res =  await request(app)
        .post('/api/v1/user')
        .send({
          name: 'abdm',
          hobby:{
              passion : "Low",
              year: 2013,
              name: "gaming" 
          }
        })
      let userId = res.body.id
      //get hobbies array by userId
      let userResponse  = await  request(app).get(`/api/v1/hobby/${userId}`)
      let userHobbies = userResponse.body
      let hobbieId = userHobbies[0].id
       await request(app).put(`/api/v1/hobby/${userId}/${hobbieId}`).send({
        name: 'abdm',
        hobby:{
            passion : "Low",
            year: 2013,
            name: "ps" 
        }
      })
      let userResponseUpdated  = await  request(app).get(`/api/v1/hobby/${userId}`)
      let userUpdated = userResponseUpdated.body
      expect(Array.isArray( userUpdated)).toBe(true)
      expect( userUpdated[0].name).toBe('ps')
    });

  




   });