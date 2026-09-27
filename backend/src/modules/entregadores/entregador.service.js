const bcrypt = require('bcrypt');
const entregadorRepository = require('./entregador.repository');
const usuarioRepository = require('../../modules/usuarios/usuario.repository');

const AppError = require('../../common/errors/AppError');
const HTTP_STATUS = require('../../common/erros/http-status');
const MENSAGENS = require('../../common/erros/mensagens');
const PERFIS = require('../../common/constants/perfis');


class EntregadorService{

    async criarEntregador(dados,usuarioAutenticado){
       
        const session = await mongoose.startSession();
        
        try {
            session.starTransaction();

            const dadosUsuario = {
                nome: dados.nome,
                cpf: dados.cpf,
                email: dados.email,
                senha: dados.senha,
                telefone: dados.telefone,
                foto: dados.foto,
                perfil: PERFIS.ENTREGADOR
            };

            const usuario = await usuarioService.criarUsuario(
                dadosUsuario,
                usuarioAutenticado,
                session             
            );

         const entregador = await entregadorRepository.criar({
            usuarioId: usuario._id,
            empresaId: usuario.empresaId,
            veiculo: dados.veiculo
        },

        session

        );
        
        // ===== aqui vamos criar uma funcao para receber o usuario autenticado
        await session.commitTransaction();
        
        return {
            usuario,
            entregador
        }
        

        } catch (erro) {
        
            await sessio.abortTransaction();

            throw erro;
        
        } finally{
        
            await session.endSession();
        }
    
    }
       

}

module.exports = new EntregadorService();

