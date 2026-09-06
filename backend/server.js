
const app = require("./app.js");
const conectarBanco = require("./src/config/database.js")

const { PORT, NODE_ENV, APP_NAME} = require ("./src/config/env.js");


async function iniciarServidor(){

    await conectarBanco();

    app.listen(PORT, ()=>{

    


    console.log("====================================");
    console.log(`🚀 ${APP_NAME}`);
    console.log(`🌎 Ambiente: ${NODE_ENV}`);
    console.log(`🚪 Porta: ${PORT}`);
    console.log("====================================");

});

};


iniciarServidor();