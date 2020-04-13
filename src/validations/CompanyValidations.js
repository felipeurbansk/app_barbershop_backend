const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {

    company_create() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required()
            }).unknown()
        })
    },

    company_ready() {
        return celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().integer().required()
            }).unknown()
        })
    },

    company_update() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                id: Joi.number().integer().required(),
                name: Joi.string().max(250),
                logo: Joi.string(),
                razao_social: Joi.string().max(250),
                nome_fantasia: Joi.string().max(250),
                cnpj: Joi.string().max(14).min(14),
                ie: Joi.string().max(12),
                im: Joi.string().max(12),
                email: Joi.string().email(),
                phone: Joi.string().max(14),
                about: Joi.string(),
                cancel_policies: Joi.string()
            }).unknown()
        })
    },

    company_delete() {
        return celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().integer().required()
            }).unknown()
        })
    },


}