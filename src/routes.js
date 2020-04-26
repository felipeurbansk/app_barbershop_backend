const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

/* Controllers */
const UserController = require('./api/controllers/UserController');
const EmployeeController = require('./api/controllers/EmployeeController');
const LoginController = require('./api/controllers/LoginController');
const CompanyController = require('./api/controllers/CompanyController');

/** Validations */
const UserValidations = require('./validations/UserValidations');
const EmployeeValidations = require('./validations/EmployeeValidations');
const CompanyValidations = require('./validations/CompanyValidations');

const routes = express.Router();

/** Authentication */
routes.post('/login',   UserValidations.user_login(), LoginController.login );

/** User */
routes.get('/user/:id', UserValidations.user_consult(), UserController.ready);
routes.delete('/user',  UserValidations.user_delete(), UserController.delete);
routes.post('/user',    UserValidations.user_create() , UserController.create);
routes.put('/user',     UserValidations.user_update(), UserController.update);

/** Employee */
routes.get('/employee/:id', EmployeeValidations.employee_ready(),  EmployeeController.ready);

routes.post('/employee', 
    [ UserValidations.user_create(), EmployeeValidations.employee_create()]
, EmployeeController.create);

routes.put('/employee', [
    UserValidations.user_update(), 
    EmployeeValidations.employee_update()
],  EmployeeController.update);

routes.delete('/employee', EmployeeValidations.employee_delete(),  EmployeeController.delete);


/** Company */
routes.get('/company/employees', CompanyController.get_employees);
routes.post('/company', CompanyValidations.company_create(), CompanyController.create);
routes.put('/company', CompanyValidations.company_update(), CompanyController.update);
routes.delete('/company/:id', CompanyValidations.company_delete(), CompanyController.delete);
routes.get('/company/:id', CompanyValidations.company_ready(), CompanyController.ready);


module.exports = routes;



