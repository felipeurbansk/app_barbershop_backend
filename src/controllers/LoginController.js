const UserServices = require('../services/UserServices');

module.exports = {

    async login( req, res ){
        
        const { email, password } = req.body;

        const user = await UserServices.login( { email, password } );

        if ( !user ) return res.status(400).json({error: "E-mail not registered."});

        return res.send( user );

    }


}