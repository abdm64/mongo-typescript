import { Router, Response,Request } from "express";
import User, { IUser } from "../models/User";
import Hobby, { IHobby } from "../models/Hobby";
import {   StatusCodes } from 'http-status-codes';
import {  check, validationResult } from 'express-validator';
import {  checkUserInputValidator  } from '../middlewares/checkValidator'


const router: Router = Router();

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The  CRUD API for user
  */




/**
 * @swagger
 * components:
 *   schemas:
 *     Input:
 *       type: object
 *       required:
 *         - name
 *         - hobby
 *       properties:

 *         name:
 *           type: string
 *           description: The name of the user
 *         hobby:
 *           type: object
 *           required: 
 *             - name
 *             - passion
 *             - year
 *           properties:  
 *              name:
 *                type: string 
 *                description: The name of the  hobby must be unique with every user
 *              passion:
 *                type : string 
 *                description: The level of passion 
 *              year:
 *                type : integer  
 *                description: started year
 *                
 *           description:  the object that define hobby 
 *       example: 
 *         name: abdm 
 *         hobby: 
 *            name: football
 *            passion: Low
 *            year: 2017
 *
 *
 */




 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The  CRUD API for user
  */




/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - hobbies
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         hobbies:
 *           type: array
 *           items: 
 *              $ref: '#/components/schemas/Hobby'  
 *       example: 
 *         name: abdm
 *         id: 61056e112924a2549d49460f  
 *         hobbies: 
 *          - id: 61056e112924a2549d49460d
 *            name: football
 *            passion: Low
 *            year: 2017
 *
 *
 */


/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     tags:  [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Input'
 *     responses:
 *       200:
 *         description: save user
 *         content:
 *           application/json:
 *             schema:
 *              
 *              
 *               $ref: '#/components/schemas/User'
 *         example: 
 *          name: abd8
 *          id: 61056e112924a2549d49460f  
 *          hobby: 
 *             id: 61056e112924a2549d49460d
 *             name: football
 *             passion: Low
 *             year: 2017
 *       500:
 *         description: Some server error
 *       400:
 *         description : bad request 
 */


router.post("/user", 
checkUserInputValidator()

, async  (req : Request,res: Response) : Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hobbiesInput: IHobby = req.body.hobby
    const name = req.body.name
    const hobby= new Hobby( {
     
          passion : hobbiesInput.passion,
          year : hobbiesInput.year,
          name : hobbiesInput.name

          } )

          try  {
            
            await hobby.save()

            const user: IUser  = new User( {name  }  )
            user.hobbies.push(hobby)
            const savedUser = await user.save()
          return  res.status(StatusCodes.CREATED).send(savedUser)




          } catch(err) { 



         return   res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
           }
   

})

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: get all users with the hobbies
 *     tags: [Users]
 *     requestBody:
 *       required: false

 *     responses:
 *       200:
 *         description: The users was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array 
 *               items:  
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */



router.get('/user',async (req : Request,res: Response) : Promise<Response>  => {


  try  {
            
    const users = await  User.find().populate('hobbies')



if (users.length > 0)  { 

  return res.send(users)
} 

return res.status(StatusCodes.NOT_FOUND).send({ message  : "users not found" })


  } catch(err) { 



  return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
   }




})

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: get user by id 
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user by id   
 *     responses:
 *       200:
 *         description: The user was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not Found  
 */

router.get('/user/:id',async (req : Request,res: Response) : Promise<Response>  => {
    const id = req.params.id

   

    try  {
            
      const user = await  User.findOne( { _id: id }).populate('hobbies')
  
      if (user)  { 

        return res.send(user)
    }

    return res.status(StatusCodes.NOT_FOUND).send({ message  : "user not found" })
  
  
  
    } catch(err) { 
  
  
  
    return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
     }
  




    
   
   
   })



   /**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     summary: update user name  by id 
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id  
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Input' 
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not Found  
 */

   router.put('/user/:id',check('name', ' Name is required').not().isEmpty(),async (req : Request,res: Response): Promise<Response> => {
    const id = req.params.id
    const name = req.body.name
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    


    try  {
      const user = await  User.findOne( { _id: id } )

      if (user)  { 
  
           await  User.findOneAndUpdate( { _id: id }, { name } ).populate('hobbies')
          return res.status(StatusCodes.OK).send()
      }
  
      return res.status(StatusCodes.NOT_FOUND).send({ message  : "user not found" }) 
    
    }

   
  
  
  
     catch(err) { 
  
  
      return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
     }

   
   
   
   
   
   })

/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: delete user by id 
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user by id   
 *     responses:
 *       204:
 *         description: The user was successfully deleted

 *       500:
 *         description: Some server error
 *       404:
 *         description: Not Found  
 */

   router.delete('/user/:id',async (req : Request,res: Response) : Promise<Response> => {


    try  { 
      const id = req.params.id
      const user = await  User.findOne({ _id: id } )
      


      if (user)  { 
       
        const userHobbies : IHobby[] = user.hobbies
        await Hobby.deleteMany( { _id : { $in: userHobbies} } )
        await  User.findOneAndDelete( { _id: id } )
        return res.status(204).send()
      
   }

   return res.status(StatusCodes.NOT_FOUND).send({ message  : "user not found" }) 




     } catch(err) { 

      return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)

      }
   
   
   
   })


export default router  

