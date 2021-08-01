import { check, validationResult, ValidationError, ValidationChain, Result } from 'express-validator'
import { Passion }  from "../models/Passion"


export const checkUserInputValidator = (): ValidationChain[] => [
    check('name', ' Name is required').not().isEmpty(),
    check('hobbie.passion', ' passion is required').not().isEmpty(),
    check('hobbie.year', ' year is required').not().isEmpty(),
    check('hobbie.name', ' name is required').not().isEmpty(),
    check('hobbie.passion', ' passion must be').custom((val) => (val in Passion))

    
 
]

export const checkHobbyInputValidator = (): ValidationChain[] => [
    
    check('hobbie.passion', ' passion is required').not().isEmpty(),
    check('hobbie.year', ' year is required').not().isEmpty(),
    check('hobbie.name', ' name is required').not().isEmpty(),
    check('hobbie.passion', ' passion must be').custom((val) => (val in Passion))

    
 
]