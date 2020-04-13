const bcrypt = require('bcrypt');

const CompanyModel = require('../models/companies');

const salt = bcrypt.genSaltSync(10);

module.exports = {

    async create( company ) {
        
        const company_create = await CompanyModel.create(company);

        if ( !company_create ) return {error: "Class model not return value."}

        return company_create;

    },
    
    async ready( id ) {
        
        const company_ready = await CompanyModel.ready(id);

        if ( !company_ready ) 
            return { error: "Class model not return value." }

        return company_ready;

    },

    async update( company ) {

        const company_update = await CompanyModel.update( company );

        if ( !company_update ) return { error: "Class model not return value." };

        return company_update;

    },

    async delete( id ) {

        const company_delete = await CompanyModel.delete( id );

        if ( !company_delete ) return { error: "Class model not return value." }

        return company_delete;

    }

}