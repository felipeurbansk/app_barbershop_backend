const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {

    employee_create() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                phone: Joi.required()
            }).unknown()
        })
    },

    employee_ready() {
        return celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().integer().required()
            }).unknown()
        })
    },

    employee_delete() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                id: Joi.number().integer().required()
            })
        })
    },

    employee_update() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                
            }).unknown()
        })
    }

}