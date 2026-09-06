const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require ("../../config/env");


function gerarToken(usuario){

console.log("========== USUARIO LOGIN ==========");
console.log("ID:", usuario._id);
console.log("NOME:", usuario.nome);
console.log("PERFIL:", usuario.perfil);
console.log("EMPRESA ID:", usuario.empresaId);
console.log("==================================");

    return jwt.sign({
        sub: usuario._id.toString(),
        perfil: usuario.perfil,
        empresaId: usuario.empresaId? usuario.empresaId.toString():null
    
    },
        process.env.JWT_SECRET,
        {
        expiresIn:"8h"
        }

    );
}

function verificarToken(token){
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    gerarToken,
    verificarToken
}