
import {Request,Response,NextFunction} from "express";
import {body,ValidationChain,validationResult} from "express-validator";

/**
 * Validates the request using the provided array of validation chains.
 * If any validation fails, it returns a 422 status code with the validation errors.
 * If all validations pass, it calls the next middleware function.
 *
 * @param {ValidationChain[]} validations - An array of validation chains to run on the request.
 * @return {Promise<void>} - A promise that resolves when all validations pass or rejects with a 422 status code and validation errors.
 */
export const validate = (validations : ValidationChain[]) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        for(let validate of validations) {
            const result = await validate.run(request);
            if(!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(request);
        if(errors.isEmpty()) {
        return next();        
        }
        return response.status(422).json({errors: errors.array()});
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required."),
    body("password").trim().isLength({min:6}).withMessage("Password should be at least 6 characters long.")
];
export const signupValidator = [
    body("name").isString().isLength({min:3}).withMessage("Name should be at least 3 characters long."),
    ...loginValidator,
];