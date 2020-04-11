const connection = require('../../database/connection');

module.exports = {
    
    async create( employee, user ) {
        const user_id = user.id;
        const { phone, d_nasc, photo, is_active, is_manager } = employee;

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

    }

}