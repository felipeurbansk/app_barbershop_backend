const connection = require('../../database/connection');

module.exports = {

    async create( user ) {

        const { name, email, password } = user;

        try {

            const [id] = await connection('users').insert({
                name,
                email,
                password
            }).returning('id');
            
            return { id };

        } catch(err) {
            return { error: err.message };
        }

    },

    async ready( id ) {

        try {
            const user = await connection('users')
                .where('id', id)
                .first();
            
            return user;

        } catch(err) {
            return { error: err.message }
        }

    },

    async update( user ) {
        
        const { id, name, email, password } = user;

        try {

            const user_update = await connection('users')
                .where('id', id)
                .update({ name, email, password });
            
            return user_update;

        } catch(err) {
            return { error: err.message }
        }

    },
    
    async delete( id ) {

        try {

            const user = await connection('users')
            .where('id', id)
            .del();

            return user;

        } catch(err) {
            return { error: err.message }
        }
        

    },

    async user_email( email ) {

        try {

            const user = await connection('users')
                .where('email', email)
                .first();
            
            if ( !user ) return false;

            return true;

        } catch (err) {
            
            return { error: err.message }
        }

    },

    async user_id( id ) {
        
        try {

            const user = await connection('users')
                .where('id', id)
                .first();
            
            if ( !user ) return false;

            return true;

        } catch (err) {
            
            return { error: err.message }
        }

    },

    async get_user( user ) {

        try {

            const get_user = await connection('users')
                .where('email', user.email)
                .first();
            
            if ( !get_user ) return { error: "Unregistered user." };

            return get_user;

        } catch(err) {
            return { error: err.message }
        }

    },

    async create_user_employee( employee ) {

        try {
            
            const {name, email, password} = employee;

            const user_create = await connection('users')
                .insert( { name, email, password } )
                .returning('id')
                .then( async ( [id] ) => {

                    const { phone, d_nasc, photo, is_active, company_id } = employee;
                    const user_id = id;
           
                    const employee_id = await connection('employees')
                        .insert({ phone, d_nasc, photo, is_active, user_id, company_id })
                        .returning('id')
                        .then( ( [employee_id] ) => {
                            return employee_id;
                        }).catch( err => {
                            return { code: err.code, error: err.message }
                        });
                    
                    return employee_id;

                }).catch(err => {
                    return { code: err.code, error: err.message }
                })
            
            return user_create;

        } catch(err) {
            return { code: err.code, error: err.message }
        }
    }

}