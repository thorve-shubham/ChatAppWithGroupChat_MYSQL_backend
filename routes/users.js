const express = require('express');
const route = express.Router();

const userController = require('../controllers/userController');

route.post("/create",userController.createUser);

route.post("/login",userController.login);

route.get("/get",userController.getOthers);

route.get("/getAll",userController.getAll);

route.post("/createGroup",userController.createGroup);

route.get("/getmyGroup",userController.getmyGroup);

module.exports = route;