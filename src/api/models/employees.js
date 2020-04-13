const connection = require('../../database/connection');

module.exports = {
    
    async create( employee ) {

        try {

            const [id] = await connection('employees')
                .insert({
                    phone,
                    d_nasc,
                    photo,
                    is_active,
                    is_manager,
                    user_id
                }).returning('id');
            
            return { id };

        } catch(err) {
            return {error: err.message}
        }

    },

    async ready( id ) {
        
        try {

            const employee = await connection('employees')
                .join('users', {'users.id': 'employees.user_id'})
                .where('employees.id', id)
                .select(['employees.*', 'users.name', 'users.email'])
                .first();
            
            return employee;

        } catch(err) {
            return { error: err.message }
        }
        
    },

    async update( employee ) {

        const { phone, d_nasc, photo, is_active, is_manager, user_id } = employee;

        try {

            const employee_update = await connection('employees')
                .where('user_id', user_id)
                .update({
                    phone,
                    d_nasc,
                    photo,
                    is_active,
                    is_manager
                });
            
            return employee_update;

        } catch(err) {
            console.log(err)
            return { error: err.message };
        }
    },

    async delete( id ) { 

        try {
            
            const employee_delete = await connection('employees')
                .where('id', id)
                .del();
            
            return employee_delete;

        } catch(err) {
            return { error: err.message }
        }

    }

}