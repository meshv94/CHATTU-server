const {z} = require("zod");

const registerSchema = z.object({
    username : z
    .string({ message : 'username name must be required !'})
    .trim()
    .min(5 , { message : " username must contain least 5 characters"})
    .max( 15 , { message : 'username must contain atmost 15 charcaters'}),

    phone : z
    .string()
    .trim()
    .min(10 , { message : 'phone should be of 10 digits'})
    .max(10 , { message : 'phone should be of 10 digits'}),

    gender : z
    .string(),

    password : z
    .string()
    .trim()
    .min(8 , { message : 'password must contain least 8 characters'})
    
})

const loginSchema = z.object({
    username : z
    .string()
    .trim(),

    password : z
    .string()
    .trim()
    .min(8 , { message : 'password must contain least 8 characters'})
})

module.exports = {registerSchema , loginSchema};