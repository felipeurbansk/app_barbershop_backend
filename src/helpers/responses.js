const fs = require('fs');

module.exports = {

    /**
     * Return response
     */
     responseAPI( code ) {

        const errors =  openFileErros();
        
        return { error: errors[code] };

    }


}

function openFileErros() {

    try {

        const errors = JSON.parse( fs.readFileSync('./src/config/errors.json') );

        return errors;

    } catch(err) {

        return err;

    }

}