import { check,  ValidationChain } from 'express-validator'
import { Passion }  from "../models/Passion"


export const checkUserInputValidator = (): ValidationChain[] => [
    check('name', ' Name is required').not().isEmpty(),
    check('hobby.passion', ' passion is required').not().isEmpty(),
    check('hobby.year', ' year is required').not().isEmpty(),
    check('hobby.name', ' name is required').not().isEmpty(),
    check('hobby.passion', ' passion must be').custom((val) => (val in Passion))

    
 
]

export const checkHobbyInputValidator = (): ValidationChain[] => [
    
    check('hobby.passion', ' passion is required').not().isEmpty(),
    check('hobby.year', ' year is required').not().isEmpty(),
    check('hobby.name', ' name is required').not().isEmpty(),
    check('hobby.passion', ' passion must be in').custom((val) => (val in Passion))

    
 
]