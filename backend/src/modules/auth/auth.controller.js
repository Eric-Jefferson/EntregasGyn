const { login } = require("./auth.service");

async function realizarLogin (req,res){
    try{
        const {email,senha} = req.body;

        if(!email || !senha){
            return res.status(400).json({
                sucesso:false,
                mensagem:"E-mail e senha sao obrigatorios."
            });
        }

        const resultado = await login(email,senha);
            return res.status(200).json({
                sucesso: true,
                mensagem: "Login realizado com sucesso",
                ...resultado
            })
        }catch (error){
            return res.status(401).json({
                sucesso: false,
                mensagem: error.message
            });
    }
}

// aqui vamos criar uma funcao para receber o usuario autenticado
function obterUsuarioAutenticado(req,res){
    return res.status(200).json({
        sucesso: true,
        usuario: req.usuario
    });
}



module.exports = {
    obterUsuarioAutenticado, realizarLogin
};