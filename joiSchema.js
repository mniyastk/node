const Joi=require('joi');
const regSchema= Joi.object(
    {
        name:Joi.string().required(),
        username:Joi.string().required().alphanum().min(5).max(15),
        email:Joi.string().email().lowercase().required(),
        password:Joi.string().required().min(8).max(25),
        
    }
)
const loginSchema=Joi.object({
    username:Joi.string().alphanum().required(),
    password:Joi.string().required()

})
module.exports={regSchema,loginSchema};