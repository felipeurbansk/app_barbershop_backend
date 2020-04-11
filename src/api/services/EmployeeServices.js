const UserModel = require('../models/users')
const UserServices = require('./UserServices')
const EmployeeModel = require('../models/employees')
// const utils = require('../utils/utils');

module.exports = {

    async create( employee ) {

        const { name, email, password } = employee;
        
        if ( await UserServices.consult_user( email ) ) return { error: "Parameter [email] already exist." } 

        const user = await UserModel.create( { name, email, password } );
    
        if ( !user ) 
            return { error: "User not registered." };

        if ( user.error ) 
            return { error: user.error };
        
        const employee_create = await EmployeeModel.create(employee, user);

        if ( !employee_create ) return { error: "Employee not created" }

        return employee_create;

    }

}