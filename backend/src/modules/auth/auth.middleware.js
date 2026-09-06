const { verificarToken } = require("../../common/helpers/jwt");

function autenticar(req,res,next){
    try {
        const authorization = req.headers.authorization;
        
        console.log("=================================");
        console.log("MÉTODO:", req.method);
        console.log("ROTA:", req.originalUrl);
        console.log("AUTHORIZATION:", authorization);
        
        if(!authorization){
             console.log("❌ Authorization não encontrado.");
            return res.status(401).json({
                sucesso: false,
                mensagem: "Token de autenticaçao nao informado"
            });
        }

        const partes = authorization.split(" ");

        if (
            partes.length !== 2 ||
            partes[0] !== "Bearer" 
        ) {
               console.log("❌ Formato do token inválido.");
            return res.status(401).json({
                sucesso: false,
                mensagem:"Formato do token invalido."
            });
        }
        
        const token = partes[1];
         console.log("TOKEN RECEBIDO:", token);
        const payload = verificarToken(token);

          console.log("✅ TOKEN VALIDADO!");
        console.log("PAYLOAD:", payload);

        req.usuario = payload;
        next();

    } catch (error) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Token invalido ou expirado."
        });


    }
}

module.exports = { autenticar };