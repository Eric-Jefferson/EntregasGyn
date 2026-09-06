const { 
     criarUsuario,
     login } = require ("./auth.service");

const conectarBanco = require("../../config/database");


async function testar(){
    try {
        await conectarBanco();

        const usuario = await criarUsuario({
            nome: "Administrador Entegas Gyn",
            email:"admin@entregasgyn.com",
            senha: "123456",
            telefone: 62999999999,
            perfil: "MASTER_ADMIN",
            empresaId: null
        });
        console.log("Usuario Criado!");
        console.log(usuario);

        process.exit(0);
    } catch (error){
        console.error("Error: ")
        console.error(error.message);

        process.exit(1);
    }
}

//testar()
async function testarLogin(){

    try {

        await conectarBanco();

        const usuarioLogin = await login("admin@entregasgyn.com","123456");
            
        console.log("LOGIN REALIZADO")
        console.log(usuarioLogin)

        process.exit(0);
    } catch (error) {
        console.error("Erro no Login")
        console.error(error.message);

        // process.exit(1)

    }
        
}


testarLogin();
// node src/modules/auth/teste-auth.js