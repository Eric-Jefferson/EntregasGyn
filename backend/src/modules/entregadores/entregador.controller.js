const entregadorService = require("./entregador.service");
const HTTP_STATUS = require('../../common/erros/http-status');
const MENSAGENS = require('../../common/erros/mensagens');;

class EntregadorController{

    async criar(req,res,next){
        
        try {
            const resultado = await entregadorService.criarEntregador(
                req.body,
                req.usuario
            );

            return res.status(HTTP_STATUS.CRIADO).json({
                sucesso: true,
                mensagem: MENSAGENS.USUARIO_CRIADO,
                dados: resultado
            }
            );
            } catch (erro){

                next (erro);

        }
    }   

}


module.exports = new EntregadorController();
