const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

/* Controllers */
const UserController = require('./api/controllers/UserController');
const EmployeeController = require('./api/controllers/EmployeeController');
const LoginController = require('./api/controllers/LoginController');

/** Validations */
const UserValidations = require('./validations/UserValidations');
const EmployeeValidations = require('./validations/EmployeeValidations');

const routes = express.Router();

/** Authentication */
routes.post('/login',   UserValidations.user_login(), LoginController.login );

/** User */
routes.get('/user/:id', UserValidations.user_consult(), UserController.ready);
routes.delete('/user',  UserValidations.user_delete(), UserController.delete);
routes.post('/user',    UserValidations.user_create() , UserController.create);
routes.put('/user',     UserValidations.user_update(), UserController.update);

/** Employee */
routes.post('/employee', [
    UserValidations.user_create(), 
    EmployeeValidations.employee_create()
],  EmployeeController.create);

module.exports = routes;



