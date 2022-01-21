const {check,validationResult}=require('express-validator');

exports.validateSignupRequest = [
    check("firstName").notEmpty().withMessage('FirstName is required'),
    check("lastName").notEmpty().withMessage('lastName is required'),
    check("email").isEmail().withMessage('Valid Email is required'),
    check("password").isLength({min:6}).withMessage('Password at least must be at least 6 characters'),
];
exports.validateSignInRequest = [
    check("email").isEmail().withMessage('Valid Email is required'),
    check("password").isLength({min:6}).withMessage('Password at least must be at least 6 characters'),
];
exports.isRequestValidated=(res,req,next)=>{
    const errors = validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({error: errors.array()[0].msg});
    }
    next();
};