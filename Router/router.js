//import express
const express = require('express');

//router library is inside express
const router = new express.Router()

//import controller
const userController = require('../Controller/userController')
const projectController = require("../Controller/projectController")
const jwtMiddleware = require("../Middleware/jwtMiddleware")
const multerConfig = require("../Middleware/multerMiddleware")

//different paths for resolving requests
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.post('/project/addproject', jwtMiddleware, multerConfig.single('projectImage'), projectController.addProject)



//export router
module.exports = router