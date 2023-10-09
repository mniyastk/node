const Joi = require("joi");
const regJoi=async (req,res,next)=>{
  const regSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required().alphanum().min(5).max(15),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required().min(8).max(25),
  });
  try {
   await regSchema.validateAsync(req.body);
   next()
  } catch (error) {
    res.status(400).json({ error: error.details[0].message });
  }
 

}
 const logJoi= async (req,res,next)=>{
  const loginSchema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().required(),
  });
  try {
    await loginSchema.validateAsync(req.body)
    next()
  } catch (error) {
    res.status(401).send(`User does not exist: ${error}`);
  }
 }
module.exports = { regJoi,logJoi };
