const bcrypt = require('bcrypt');

const UserModel = require('../models/users')
const UserServices = require('./UserServices')
const EmployeeModel = require('../models/employees')
const response = require('../../helpers/responses');
const salt = bcrypt.genSaltSync(10);

module.exports = {

    async create( employee ) {

        if ( await UserServices.consult_user( employee.email ) ) {
            
            return { 
                error: { 
                    title: "E-mail já existe",
                    message: "E-mail already exist.",
                    details: "O e-mail informado já está cadastrado.",
                    http: 401
                }
            }

        }

        employee.password = await bcrypt.hash(employee.password, salt);

        const employee_create = await UserModel.create_user_employee( employee );
        
        if ( !employee_create ) 
            return { 
                error: { 
                    title: "Essa função não foi executada",
                    function: "create_user_employee",
                    message: "Error running this function model.",
                    details: "Ocorreu um erro da requisição ao banco de dados. Informe o nosso suporte!",
                    http: 500
                }
            }

        if ( employee_create.error ) return employee_create;

        return {
            title: "Cadastrado com sucesso.",
            message: "Employee created success.",
            details: `Funcionário ${employee.name} foi cadastrado com sucesso.`,
            data: employee,
            http: 200
        };

    },

    async ready( id ) {

        const employee = EmployeeModel.ready( id );

        if ( !employee )
            return { error: "Employee not found." }
        
        return employee;

    },

    async update( employee ) {

        const { name, password, user_id } = employee;

        user_update = await UserServices.update( { id: user_id, name, password } );

        if ( !user_update )
            return { error: "User not updated."};

        const employee_update = await EmployeeModel.update( employee );

        if ( !employee_update ) 
            return { error: "Employee not updated."};

        return employee_update;

    },
    
    /** 
     * NOT USER
     * 
     * Use delete cascade in users.
     * 
     * */
    async delete( id ) {

        const employee_delete = await EmployeeModel.delete( id );

        if ( !employee_delete ) return { error: "Employee not deleted." };

        return employee_delete;

    },

    async get_all( company_id ) {

        const employees_all = await EmployeeModel.get_all_company_id( company_id );

        if ( !employees_all ) return { error: "We didn't find employees" }

        return employees_all;

    }

}