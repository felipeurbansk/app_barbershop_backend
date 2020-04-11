const express = require('express');

const routes = express.Router();

routes.get('/user/:id', UserValidations.user_consult(), UserController.ready);
routes.delete('/user',  UserValidations.user_delete(), UserController.delete);
routes.post('/user',    UserValidations.user_create() , UserController.create);
routes.put('/user',     UserValidations.user_update(), UserController.update);

module.exports = routes;