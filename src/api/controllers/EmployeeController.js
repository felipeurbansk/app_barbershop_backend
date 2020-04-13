const EmployeeServices = require('../services/EmployeeServices');

module.exports = {

    async create(req, res) {

        const { company_id } = req.headers;
        const { name, email, password, phone, d_nasc, photo, is_active } = req.body;
        
        const employee_create = await EmployeeServices.create({
            name,
            email,
            password,
            phone,
            d_nasc,
            photo,
            is_active,
            company_id 
        });
        
        if ( !employee_create ) res.status(401).json( { error: "Employee not created." } )

        return res.json( employee_create );
        
    },

    async ready(req, res) {

        const { id } = req.params;

        const employee_ready = await EmployeeServices.ready( id );

        if ( !employee_ready ) return res.status(401).json( {error: "Employee not found"} );

        return res.json( employee_ready );

    },
    
    async update(req, res) {
        const { user_id } = req.headers;

        let employee = req.body;

        employee.user_id = user_id;
        
        const employee_update = await EmployeeServices.update(employee);

        if ( employee_update.error ) return res.status(401).json( {employee_update} );

        return res.send( {success: "Employee updated."} );

    },

    async delete(req, res) {

        const { id } = req.body;
        
        const employee_delete = await EmployeeServices.delete(id);

        if ( employee_delete.error ) return res.status(401).json(employee_delete);

        return employee_delete;
    }

}   