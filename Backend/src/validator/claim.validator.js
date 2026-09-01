import { body } from 'express-validator';

// Validation rules for claim submission
export const claimValidationRules = () => [
    body('fullName')
        .optional()
        .trim()
        .notEmpty().withMessage('Full name cannot be empty if provided'),
    body('phone')
        .optional()
        .trim()
        .matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
    body('address')
        .optional()
        .trim()
        .notEmpty().withMessage('Address cannot be empty if provided'),
    body('city')
        .optional()
        .trim()
        .notEmpty().withMessage('City cannot be empty if provided'),
    body('state')
        .optional()
        .trim()
        .notEmpty().withMessage('State cannot be empty if provided'),
    body('pinCode')
        .optional()
        .trim()
        .matches(/^[0-9]{6}$/).withMessage('Pin code must be 6 digits'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Invalid email address'),
];
