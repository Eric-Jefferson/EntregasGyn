const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const entregadorRepository = require('./entregador.repository');
const usuarioRepository = require('../../modules/usuarios/usuario.repository');
const usuarioService = require('../../modules/usuarios/usuario.service');
const AppError = require('../../common/errors/AppError');
const HTTP_STATUS = require('../../common/erros/http-status');
const MENSAGENS = require('../../common/erros/mensagens');
const PERFIS = require('../../common/constants/perfis');


class EntregadorService{

    async criarEntregador(dados,usuarioAutenticado){
       
        const session = await mongoose.startSession();
        
        let transacaoIniciada = false;
        
        try {
            session.startTransaction();
            
            transacaoIniciada = true; 
            
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

            console.log("========== USUARIO CRIADO ==========");
            console.log("ID:", usuario._id);
            console.log("EMPRESA ID:", usuario.empresaId);
            console.log("PERFIL:", usuario.perfil);
            console.log("====================================");

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
            if(transacaoIniciada){
                await session.abortTransaction();
            }
            throw erro;
        
        } finally{
        
            await session.endSession();
        }
    
    }
       

}

module.exports = new EntregadorService();

