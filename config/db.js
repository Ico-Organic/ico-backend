const mongoose = require('mongoose');

    
require('dotenv').config()

const conectarDB = async () => {
    let uri = process.env.url
    console.log(uri);
    try {

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            })
        console.log('BD Conectada');
        
    } catch (error) {
        console.log(error);
        process.exit(1); // Detenemos la app
    }

}

module.exports = conectarDB




// para entrar a heroku