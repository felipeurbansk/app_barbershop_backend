const EmployeeServices = require('../services/EmployeeServices');

module.exports = {

    async create(req, res) {

        const employee_create = await EmployeeServices.create(req.body);
        
        if ( !employee_create ) res.status(401).json( { error: "Employee not created." } )

        return res.json( employee_create );
        
    },

    async ready(req, res) {

        const { id } = req.body;

        const employee_ready = await EmployeeServices.ready( id );

        if ( !employee_ready ) return res.status(401).json( {error: "Employee not found"} );

        return res.json( employee_ready );

    },
    
    async update(req, res) {

    },

    async delete(req, res) {

    }

}   