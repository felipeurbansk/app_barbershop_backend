const UserModel = require('../models/users');
const utils = require('../../helpers/utils');
const response = require('../../helpers/responses');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

module.exports = {
    
    async create( user ) {

        if ( await user_exist( user.email ) ) {

            user.password = await bcrypt.hash(user.password, salt);

            const user_create = await UserModel.create(user);
            
            if ( user_create.error ) return { error: user_create.error };

            return {user_create, token: utils.generateTokenJWT(user_create)};

        } else {

            return  response.responseAPI('EMAIL_ALREADY_EXISTS');

        }

    },

    async ready( id ) {

        if ( !id )
            return { error: "Parameter [id] not found." }

        const user = await UserModel.ready( id );

        if ( !user ) 
            return { error: `User [${id}] not found.`, user: { id } }

        user.password = undefined;

        return {success: "Successfully", user}

    },

    async update( user ) {

        if ( !user ) 
            return { error: "Parameter [user] not found." };

        if ( user.password ) 
            user.password = await bcrypt.hash(user.password, salt);

        if ( !await user_exist( false, user.id ))
            return {error: `User [${user.id}] not found.`};
        
        const user_update = await UserModel.update(user);

        if ( !user_update ) 
            return {error: "No users have been modified."};
        
        
        return user_update;

    },

    async delete( id ) {
            
        if ( !id ) 
            return {error : "Parameter [id] not found"};

        const user_verify = await user_exist( false, id );

        if ( !user_verify ) 
            return {error: `User [${id}] not found.`};

        const user_delete = await UserModel.delete( id );

        if ( !user_delete ) 
            return { error: "No users have been modified." };
        
        return { success: "User removed successfully", user: { id: id } }

    },

    async login( user ) {

        if ( !await user_exist( user.email ) )
            return {error: `E-mail [${user.email}] not found.`};
        
        const [user_bd] = await UserModel.get_user( user );
        
        if ( !await bcrypt.compare( user.password, user_bd.password) )
            return { error: "Invalid password.", user };
        
        user_bd.password = undefined;
        user_bd.reset_password = undefined;
        
        return { success: "Login successfully", user: user_bd, token: utils.generateTokenJWT(user.id) };
        
    },

    async consult_user( email = false, id = false) {

        if ( !email && !id ) return false;

        return await user_exist( email, id );
    }

}

async function user_exist( email = false, id = false ) {
    
    if ( email ){
        
        const user = await UserModel.user_email(email);
        
        return user;
    }

    if ( id ) {
        
        const user = await UserModel.user_id(id);
        
        return user;
    }

    return false;

}