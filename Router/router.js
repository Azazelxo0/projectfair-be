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
router.get('/project/homeproject',projectController.getHomeProject);
router.get('/project/allproject',jwtMiddleware,projectController.getAllProject);
router.get('/project/userproject',jwtMiddleware,projectController.getUserProject);
router.put('/project/editproject/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)
router.delete('/project/delete/:id',jwtMiddleware,projectController.deleteUserProject)

//export router
module.exports = router
