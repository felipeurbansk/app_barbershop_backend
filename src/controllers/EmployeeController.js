const connection = require('../database/connection');
const UserController = require('../controllers/UserController');

module.exports = {

    async consult(req, res) {

    },

    async create(req, res) {

        const { 
            phone,
            d_nasc,
            photo,
            is_active,
            is_manager,
            user_id } = req.body;

        if ( !user_id ) [user] = await UserController.create(req, res);
        
        console.log(user)
        


    }

}