const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {

    generateTokenJWT( user_id = {} ) {
        return jwt.sign( { user_id }, authConfig.secret, { expiresIn: 86400 } );
    }

}