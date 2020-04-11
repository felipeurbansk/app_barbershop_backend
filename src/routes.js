const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');


const UserController = require('./controllers/UserController');
const EmployeeController = require('./controllers/EmployeeController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();

/** Authentication */
routes.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).unknown()
}), LoginController.login );

/** User */
routes.get('/user/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required()
    }).unknown()
}), UserController.ready);

routes.post('/user', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        repeat_password: Joi.ref('password')
    }).unknown()
}) , UserController.create);

routes.delete('/user', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().integer().required()
    })
}), UserController.delete);

routes.put('/user', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        repeat_password: Joi.ref('password')
    }).unknown()
},), UserController.update);

/** Employee */
routes.post('/employee', EmployeeController.create);

module.exports = routes;



