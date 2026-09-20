const usuarioService = require('./usuario.service');
const HTTP_STATUS = require('../../common/erros/http-status');
const MENSAGENS = require('../../common/erros/mensagens');
async function criar(req,res){
    try {
        const usuario = await usuarioService.criarUsuario(req.body, req.usuario);

        return res.status(HTTP_STATUS.CRIADO).json({
            sucesso: true,
            mensagem: MENSAGENS.USUARIO_CRIADO,
            dados: usuario
        })
    } catch (error){
       
        console.error("ERRO AO CRIAR USUARIO.", error);

        return res.status(HTTP_STATUS.ERRO_REQUISICAO).json({
            sucesso: false,
            mensagem: error.message
        })
    }
}
async function listar(req,res){

    try{

        const usuarios = await usuarioService.listarUsuarios(req.usuario.empresaId)

        return res.status(HTTP_STATUS.OK).json({
            sucesso:true,
            dados:usuarios
        })

     } catch (error){

       console.error("ERRO AO LISTAR USUARIOS",error);

        return res.status(error.statusCode || HTTP_STATUS.ERRO_INTERNO).json({
            sucesso:false,
            mensagem: error.message
        });
    }

}

async function buscar(req, res){

    console.log("========== BUSCAR USUARIO ==========");
    console.log("ID:", req.params.id);
    console.log("EMPRESA TOKEN:", req.usuario.empresaId);

    try {
        const usuario = await usuarioService.buscarUsuario(req.params.id,
            req.usuario.empresaId
        );
        console.log("USUARIO ENCONTRADO:", usuario);
        return res.status(HTTP_STATUS.OK).json({
            sucesso: true,
            dados: usuario
        });

    } catch (error){
        return res.status(error.statusCode || HTTP_STATUS.ERRO_INTERNO).json({
            sucesso: false,
            mensagem: error.message
        });

    }
}

async function atualizar(req,res){
    try {
        const usuario = await usuarioService.atualizarUsuario(req.params.id, req.body,req.usuario.empresaId);

        return res.status(HTTP_STATUS.OK).json({
            sucesso: true,
            mensagem:"Usuario atualizado com sucesso.",
            dados: usuario 
        })

    } catch (error){
        return res.status(error.statusCode || HTTP_STATUS.ERRO_INTERNO).json({
            sucesso: false,
            mensagem: error.message
        });
    }
}


async function remover(req, res) {

    console.log("========== REMOVER USUARIO.CONTROLLER ==========");
    console.log("ID:", req.params.id);
    console.log("EMPRESA TOKEN:", req.usuario.empresaId);

    try {

       const usuario =  await usuarioService.removerUsuario(
            req.params.id,
            req.usuario.empresaId
        );
        console.log("USUARIO ENCONTRADO:", usuario);
        return res.status(HTTP_STATUS.OK).json({
            sucesso: true,
            mensagem: "Usuário removido com sucesso."
        });

    } catch (error) {

        return res.status(error.statusCode || HTTP_STATUS.ERRO_INTERNO).json({
            sucesso: false,
            mensagem: error.message
        });
    }
}

async function alterarSenha(req, res, next){
    try {
        const { id } = req.params;
        const { senha } = req.body;
        const empresaId = req.usuario.empresaId;

        await usuarioService.alterarSenha(
            id,
            senha, 
            empresaId
        );

        return res.status(HTTP_STATUS.OK).json({
            sucesso: true,
            mensagem:"Senha alterada com sucesso!"
        });

    } catch (error){
        next(error);
    }

}
module.exports = { criar, listar, buscar, atualizar, remover, alterarSenha };