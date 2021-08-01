import { Router, Response,Request } from "express";
import User, { IUser } from "../models/User";
import Hobbie , { IHobbie , HobbieModel } from "../models/Hobbie";
import   { deleteHobbie , getNames } from "../helper/helper";
import {  StatusCodes } from 'http-status-codes';
import {  body, validationResult,check ,checkSchema  } from 'express-validator';
import {  checkHobbyInputValidator, checkUserInputValidator  } from '../middleware/checkValidator'
const router: Router = Router();


 /**
  * @swagger
  * tags:
  *   name: Hobbies
  *   description: The  CRUD API for Hobbies
  */

 
/**
 * @swagger
 * components:
 *   schemas:
 *     Hobby:
 *       type: object
 *       required:
 *         - name
 *         - passion
 *         - year   
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the hobby by mongoose
 *         name:
 *           type: string
 *           description: The name of the hobbie
 *         passion:
 *           type: string 
 *           description: The level of passion about the hobby must be Low ot hight or very hight 
 *         year:
 *           type: integer
 *           description: The year when the user start the hobby        
 *       example: 
 *          hobbie:
 *             name: play xbox 
 *             id: 61056e112924a2549d49460f  
 *             passion: Low
 *             year: 2013 
 *
 *
 */





/**
 * @swagger
 * /api/v1/hobbie/{userId}:
 *   get:
 *     summary: get hobbies by user id
 *     tags: [Hobbies]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: get all the hobbies related to a specific user by userId   in array of hobbies
 *     responses:
 *       200:
 *         description: The user was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array 
 *               items :
 *               $ref: '#/components/schemas/Hobby'
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not Found  
 */


router.get('/hobbie/:id',



async (req : Request,res: Response) : Promise<Response> => {
    
    try  {
      const id = req.params.id

      const user = await  User.findOne( { _id: id }).populate('hobbies')
  
      if (user)  { 

       if  (user.hobbies.length === 0 ) {

        return res.status(StatusCodes.NOT_FOUND).send({ message  : "hobby not found" }) 
        }
  
          return res.send(user.hobbies)
      }
  
      return res.status(StatusCodes.NOT_FOUND).send({ message  : "user not found" }) 
 




    } catch(err) { 
  
  
  
   return   res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
     }
   
  
   
   
   })


   /**
 * @swagger
 * /api/v1/hobbie/{userId}/:
 *   post:
 *     summary: add hobby to user 
 *     tags: [Hobbies]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true  
 *     requestBody: 
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Hobby'
 *         example: 
 *            - hobbie:
 *                name : PS4  
 *                passion: Low
 *                year : 2013        
 *         description: add hobby to a specific user using the userId  
 *     responses:
 *       200:
 *         description: The hobby was successfully updated
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not Found  
 */




   router.post('/hobbie/:id',
   // add validator 
   
   checkHobbyInputValidator()
  , async (req : Request,res: Response) : Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try  {
            
      const hobbieInput: HobbieModel = req.body.hobbie 
      const id = req.params.id
      const user = await  User.findOne( { _id: id }).populate('hobbies')
      
  
  
     if (user)  { 
       // user cant have 2 hobbies with the same name 
        const hobbyName = getNames(user.hobbies)
        if (hobbyName.includes(hobbieInput.name)) { 
          return res.status(StatusCodes.CONFLICT).send({ message : "hobby already exist for that user" })
         }
         const hobbie = new Hobbie( { 
            name : hobbieInput.name,
            passion : hobbieInput.passion,
            year : hobbieInput.year 

          })
          await hobbie.save()
          user.hobbies.push(hobbie)
          await user.save()
    
    return res.status(StatusCodes.OK).send(user)
    
  }
  
  return res.status(StatusCodes.NOT_FOUND).send({ message  : " user not found" })




    } catch(err) { 
  
  
  
   return   res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
     }



 
   
   
   })
   
/**
 * @swagger
 * /api/v1/hobbie/{userId}/{hobbyId}:
 *   delete:
 *     summary: delete hobbie for a specific user
 *     tags: [Hobbies]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *       - in : path 
 *         name: hobbyId
 *         schema:
 *           type: string
 *         required : true       
 *          
 *         description: get all the hobbies related to a specific user by userId   in array of hobbies this will also remove the hobbie id for the array of ref in user collection
 *     responses:
 *       204:
 *         description: The hobby was successfully deleted
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not Found  
 */

   router.delete('/hobbie/:id/:_id',async (req : Request,res: Response) : Promise<Response> => {
    try  {
      const userId = req.params.id
      const hobbieId = req.params._id
      const hobbie = await Hobbie.findOneAndDelete( { _id: hobbieId })
      const user =  await User.findOne( { _id: userId })
  
  
      if (user  &&  hobbie) {
          const deletedHobbie = deleteHobbie(user,hobbieId)
          return  res.status(204).send()
        }
        return res.status(StatusCodes.NOT_FOUND).send({ message  : "not found" })  
    } catch(err) { 
  
  
  
   return   res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
     }
    
  

   })

/**
 * @swagger
 * /api/v1/hobbie/{userId}/{hobbyId}:
 *   put:
 *     summary: update hobbie
 *     tags: [Hobbies]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *       - in : path 
 *         name: hobbyId
 *         schema:
 *           type: string
 *         required : true  
 *     requestBody: 
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Hobby'
 *         example: 
 *            - hobbie:
 *                name : PS4  
 *                passion: Low
 *                year : 2013        
 *         description: update specific hobby for a specific user 
 *     responses:
 *       200:
 *         description: The hobby was successfully updated
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not Found  
 */

   router.put('/hobbie/:id/:_id',checkUserInputValidator(),async (req : Request,res: Response) : Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      try  {
            
        const userId = req.params.id
        const hobbieId = req.params._id
        const hobbieInput : HobbieModel = req.body.hobbie 
        const hobbie = await Hobbie.findOne( { _id: hobbieId })
        const user = await User.findOne( { _id: userId })
        
    
        if (hobbie &&  user) {
          const hobbyNames = getNames(user.hobbies)
        if (hobbyNames.includes(hobbieInput.name)) { 
          return res.status(StatusCodes.CONFLICT).send({ message : "hobby already exist for that user" })
         }
         
          await Hobbie.findOneAndUpdate( { _id: hobbieId }, hobbieInput, {new: true})
          return  res.status(StatusCodes.OK).send()
          }
    
          return   res.status(StatusCodes.NOT_FOUND).send({ message  : "not found" })




      } catch(err) { 
    
    console.log(err)
    
     return   res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
       }
    

    




   })


   export default router  



  