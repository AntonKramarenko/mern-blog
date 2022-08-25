import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Wrong email').isEmail(),
    body('password', 'Wrong password').isLength({ min: 5 })
]

export const registerValidation = [
    body('email', 'Wrong email').isEmail(),
    body('password', 'Wrong password').isLength({ min: 5 }),
    body('fullName', 'Wrong full name').isLength({ min: 3 }),
    body('avatar', 'Wrong url').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Enter title').isLength({ min: 3 }).isString(),
    body('text', 'Enter text').isLength({ min: 3 }).isString(),
    body('tags', 'Wrong tags').optional().isString(),
    body('imageURL', 'Wrong url').optional().isString(),
]