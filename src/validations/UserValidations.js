const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {

    user_create() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                repeat_password: Joi.ref('password')
            }).unknown()
        })
    },

    user_consult() {
        return celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().integer().required()
            }).unknown()
        })
    },

    user_login() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }).unknown()
        })
    },

    user_delete() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                id: Joi.number().integer().required()
            })
        })
    },

    user_update() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string(),
                email: Joi.string().email(),
                password: Joi.string(),
                repeat_password: Joi.ref('password')
            }).unknown()
        })
    }

}