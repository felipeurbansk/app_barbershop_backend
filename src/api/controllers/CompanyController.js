const CompanyServices = require('../services/CompanyServices');
const EmployeeServices = require('../services/EmployeeServices');

module.exports = {

    async create(req, res) {

        const company = await CompanyServices.create(req.body);

        if ( company.error ) 
            return res.status(401).json(company)

        return res.send( { id: company });

    },

    async ready(req, res) {

        const { id } = req.params;

        const company = await CompanyServices.ready(id);

        if ( !company ) 
            return res.status(401).json({ error: "Class service no return value."})

        if ( company.error ) 
            return res.status(401).json( company );

        return res.send( company );

    },

    async update( req, res ) {

        const company = await CompanyServices.update( req.body )

        if ( !company ) 
            return res.status(401).json( {error: "Class service no return value."} );

        if ( company.error ) 
            return res.status(401).json( company );

        return res.send( { success: company } );

    },

    async delete( req, res ) {

        const { id } = req.params;

        const company = await CompanyServices.delete( id );

        if ( !company ) 
            return res.status(401).json( { error: "Class service not return value." } );

        if ( company.error ) 
            return res.status(401).json( company );

        return res.send( { success: company } );

    },

    async get_employees(req, res) {
        
        const company_id = req.headers.company_id;

        const employees = await EmployeeServices.get_all( company_id );
    
        if ( !employees )
            return res.status(401).json( { error: "Class service not return value." } );

        if ( employees.error )
            return res.status(401).json( { employees } );

        return res.send( {employees} );
    
    }

}