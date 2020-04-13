const connection = require('../../database/connection');


module.exports = {

    async create( company ) {
        try {

            const [id] = await connection('companies')
                .insert(company)
                .returning('id');
            
            return id;

        } catch(err) {
            return { code: err.code, error: err.message }
        }
    },

    async ready( id ) {
        try {

            const company = await connection('companies')
                .where('id', id)
                .select('*')
                .first();
            
            return company;

        } catch(err) {
            return { code: err.code, error: err.message }
        }
    },

    async update( company ) {
        try {

            const { id } = company;

            const company_update = await connection('companies')
                .where('id', id)
                .update( company )
            
            return company_update;

        } catch(err) {
            return { code: err.code, error: err.message }
        }
    },

    async delete( id ) {
        try {

            const company_delete = await connection('companies')
                .where('id', id)
                .del();
            
            return company_delete;
            
        } catch(err) {
            return { code: err.code, error: err.message }
        }
    },

}