const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controller/auth");
const validate = require("../middleware/validateAuth");
const { loginSchema, registerSchema } = require("../validator/authValidator");


router.post("/register" ,  validate(registerSchema),register)
router.post("/login"  ,validate(loginSchema) , login)
router.post("/logout" ,logout)
// router.post("/auth" , authMiddleware , user)

module.exports = router