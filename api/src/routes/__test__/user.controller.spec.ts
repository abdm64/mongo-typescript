import request from 'supertest';
import { app } from '../../app';




  
  describe('User Routes', () => {


    it('save user', async () => {
     
      return await request(app)
        .post('/api/v1/user')
        .send({
          name: 'abdm',
          hobby:{
              passion : "Low",
              year: 2013,
              name: "gaming" 
          }
        })
        .expect(201);
    });


    it('get user by id and verify the return type of hobbies  array ', async () => {
      
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
      let userResponse  = await  request(app).get(`/api/v1/user/${userId}`)
      let userName = userResponse.body.name
      expect(userName).toBe('abdm')
    });


    it('get user by id', async () => {
      
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
      let userResponse  = await  request(app).get(`/api/v1/user/${userId}`)
      let userName = userResponse.body.name
      let userHobbies = userResponse.body.hobbies 
      expect(Array.isArray(userHobbies)).toBe(true)
      expect(userName).toBe('abdm')
    });

  




   });