const bcrypt = require('bcrypt');

const UserModel = require('../models/users')
const UserServices = require('./UserServices')
const EmployeeModel = require('../models/employees')

const salt = bcrypt.genSaltSync(10);

module.exports = {

    async create( employee ) {

        if ( await UserServices.consult_user( employee.email ) ) return { error: "Parameter [email] already exist." } 

        employee.password = await bcrypt.hash(employee.password, salt);

        const employee_create = await UserModel.create_user_employee( employee );
        
        if ( !employee_create ) 
            return { error: "Employee not created." }

        if ( employee_create.error ) 
            return employee_create;

        return { id:employee_create, success: "Employee created success." };

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

    }

}