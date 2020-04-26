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
            return { 
                error: { 
                    title: "Não foi possível executar essa função.",
                    message: "Error running this query.",
                    details: "Ocorreu um erro ao tentar criar um novo usuário. Informe o nosso suporte!",
                    http: 500,
                    err
                }
            }
        }

    },

    async ready( id ) {

        try {
            const user = await connection('users')
                .where('id', id)
                .first();
            
            return user;

        } catch(err) {
            return { 
                title: "Não foi possível executar essa função.",
                message: "Error running this query.",
                details: "Ocorreu um erro ao tentar consultar esse usuário. Informe o nosso suporte!",
                http: 500,
                err
            }
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
            return { 
                title: "Não foi possível executar essa função.",
                message: "Error running this query.",
                details: "Ocorreu um erro ao tentar atualizar esse usuário. Informe o nosso suporte!",
                http: 500,
                err
            }
        }

    },
    
    async delete( id ) {

        try {

            const user = await connection('users')
            .where('id', id)
            .del();

            return user;

        } catch(err) {
            return { 
                title: "Não foi possível executar essa função.",
                message: "Error running this query.",
                details: "Ocorreu um erro ao tentar deletar esse usuário. Informe o nosso suporte!",
                http: 500,
                err
            }
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
            
            return { 
                title: "Usuário não encontrado",
                message: "No users with this e-mail.",
                details: "Ocorreu um erro ao tentar consultar esse usuário. Informe o nosso suporte!",
                http: 500,
                err
            }
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
            
            return { 
                title: "Erro ao executar essa consulta.",
                message: "Error running this query.",
                details: "Ocorreu um erro ao tentar consultar esse usuário. Por favor, informe o nosso suporte!",
                http: 500,
                err
            }
        }

    },

    async get_user( user ) {

        try {

            const get_user = await connection('users')
                .join('employees', 'users.id', 'employees.user_id')
                .where('email', user.email)
                .select(['users.*', 'employees.company_id']);
            
            if ( !get_user ) 
                return { 
                    title: "Usuário não encontrado",
                    message: "No users with this email.",
                    details: "Não encontramos nenhum usuário com esse e-mail.",
                    http: 401
                }

            return get_user;

        } catch(err) {
            return { 
                title: "Erro ao consultar usuário",
                message: "Error running this query.",
                details: "Não foi possivel consultar esse usuário. Entre em contato com nosso suporte!",
                http: 500,
                err
            }
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
                            return { 
                                title: "Erro ao cadastrar o funcionario",
                                message: "Employee cannot be created.",
                                details: "Não foi possivel criar esse funcionario. Entre em contato com nosso suporte!",
                                http: 500,
                                err
                            }
                        });
                    
                    return employee_id;

                }).catch(err => {
                    return { 
                        title: "Erro ao cadastrar o usuário",
                        message: "User cannot be created.",
                        details: "Não foi possivel criar esse usuário. Entre em contato com nosso suporte!",
                        http: 500,
                        err
                    }
                })
            
            return user_create;

        } catch(err) {
            return { 
                title: "Erro ao executar essa função",
                message: "User cannot be created.",
                details: "Não foi possivel criar esse funcionario. Entre em contato com nosso suporte!",
                http: 500,
                err
            }
        }
    }

}