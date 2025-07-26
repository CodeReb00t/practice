const { loginUser, signUpUser } = require('../controllers/authController')

const express = require('express')

const authRouter = express.Router()

//login
authRouter.post('/login', loginUser)

//signup
authRouter.post('/signup', signUpUser)

module.exports = { authRouter }