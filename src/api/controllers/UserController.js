const UserServices = require('../services/UserServices');

module.exports = {

    async create(req, res) {

        const user = await UserServices.create( req.body );
        
        if ( user.error ) return res.status(user.error.http).json( user.error );

        return res.send(user);

    },

    async ready( req, res ) {

        const { id } = req.params;
        
        const user = await UserServices.ready( id );

        if ( user.error ) return res.status(401).json( user.error );

        return res.json(user);

    },

    async delete(req, res) {

        const { id } = req.body;

        const user = await UserServices.delete( id );

        if ( user.error ) return res.status(400).json( { error: user.error } );
        
        return res.send({
            success: `User [${id}] deleted.`,
            user: {
                id: id
            }
        });
        
    },

    async update(req, res) {

        let { id, name, email, password } = req.body;

        try {

            const user = await UserServices.update( { id, name, email, password } );

            if ( user.error ) return res.status(400).json( { error: user.error } );

            return res.json({
                success: `User [${id}] updated success.`,
                user: {
                    id,
                    name,
                    email
                }
            });

        } catch (err) {
            return res.json( { error: err.constraint } );
        }

    }


}
