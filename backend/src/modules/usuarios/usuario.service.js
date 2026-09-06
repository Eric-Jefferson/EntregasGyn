const usuarioRepository = require('./usuario.repository');
const PERFIS = require("../../common/constants/perfis");
const PERMISSOES = require('../../common/constants/permissoes');
const PERFIS_PERMISSOES = require('../../common/constants/perfis-permissoes');
const PERFIS_CRIAVEIS = require('../../common/constants/perfis-criaveis');
const HTTP_STATUS = require('../../common/erros/http-status');
const MENSAGENS = require('../../common/erros/mensagens');
const AppError = require('../../common/errors/AppError');

async function criarUsuario(dados,usuarioAutenticado){
   
    const perfilSolicitante = usuarioAutenticado.perfil;
    const empresaId = usuarioAutenticado.empresaId;
    const permissoesDoPerfil = PERFIS_PERMISSOES[perfilSolicitante] || [];

    if (!permissoesDoPerfil.includes(PERMISSOES.USUARIO_CRIAR)
    ) 
        {
        throw new AppError(MENSAGENS.USUARIO_SEM_PERMISSAO, HTTP_STATUS.NAO_AUTORIZADO); 
    }
   
    const perfisPermitidos = PERFIS_CRIAVEIS[perfilSolicitante] || [];
        
    if(!perfisPermitidos.includes(dados.perfil)
    )
    {
    throw new AppError(MENSAGENS.USUARIO_SEM_PERMISSAO, HTTP_STATUS.USUARIO_SEM_PERMISSAO);
    }

    
    if (!empresaId){
        throw new AppError(MENSAGENS.USUARIO_NAO_VINCULADO_EMPRESA, HTTP_STATUS.NAO_AUTORIZADO);
    }
    
    
    const emailExistente = await usuarioRepository.buscarPorEmail(dados.email);

    if(emailExistente){
        throw new Error ("Este E-mail ja esta cadastrado.");
    }

    const cpfExistente = await usuarioRepository.buscarPorCpf(dados.cpf);

    if(cpfExistente){
        throw new Error ("Cpf ja cadastrado.");
    }

    const {
    empresaId: empresaIdIgnorado,
    ...dadosUsuario
    } = dados;

    console.log("=================================");
    console.log("EMPRESA DO TOKEN:", empresaId);
    console.log("EMPRESA DO BODY:", dados.empresaId);
    console.log("=================================");

    const usuario = await usuarioRepository.criar({
        ...dados,
        empresaId
    });

    usuario.senha = undefined;

    return usuario;

    
}

async function listarUsuarios(empresaId){

    if (!empresaId){
        throw new Error("Usuario nao esta vinculado a uma empresa.");
    }

    return await usuarioRepository.listarPorEmpresa(empresaId)
}



async function buscarUsuario(id,empresaId){

    const usuario = await usuarioRepository.buscarPorId(id);

    if (!usuario){
        throw new AppError (MENSAGENS.USUARIO_NAO_ENCONTRADO, HTTP_STATUS.NAO_ENCONTRADO)
    }
    
    if (!usuario.empresaId || !empresaId){
        throw new AppError(MENSAGENS.USUARIO_NAO_PERTENCE_EMPRESA, HTTP_STATUS.NAO_AUTORIZADO)
    }

    if(usuario.empresaId.toString() !== empresaId.toString()){
        throw new AppError(MENSAGENS.USUARIO_NAO_VINCULADO_EMPRESA, HTTP_STATUS.NAO_AUTORIZADO)
    }

    usuario.senha = undefined;

    return usuario;
    
}

async function atualizarUsuario(id,dados,empresaId){

    const usuario = await usuarioRepository.buscarPorId(id);
    
    if(!usuario){
        throw new AppError (MENSAGENS.USUARIO_NAO_ENCONTRADO, HTTP_STATUS.NAO_ENCONTRADO);
    }

    if(!usuario.empresaId || !empresaId){
        throw new AppError(MENSAGENS.USUARIO_NAO_PERTENCE_EMPRESA, HTTP_STATUS.NAO_AUTORIZADO);
    }

    if(usuario.empresaId.toString() !== empresaId.toString()){
        throw new AppError(MENSAGENS.USUARIO_NAO_VINCULADO_EMPRESA, HTTP_STATUS.NAO_AUTORIZADO);
    }

    // aqui impedimos alteracao da empresa pelo cliente!
    delete dados.empresaId;

    const atualizado = await usuarioRepository.atualizar(id,dados);

    return atualizado;
}

async function removerUsuario(id,empresaId){
    
    const usuario = await usuarioRepository.buscarPorId (id);
   
    if(!usuario){
        throw new AppError(MENSAGENS.USUARIO_NAO_ENCONTRADO, HTTP_STATUS.NAO_ENCONTRADO);
    }
    
     console.log("========== REMOVER USUARIO.SERVICE ==========");
    console.log("ID:", id);
    console.log("EMPRESA DO USUARIO:", usuario.empresaId);
    console.log("EMPRESA DO TOKEN:", empresaId);


    if(!usuario.empresaId || !empresaId){
        throw new AppError(MENSAGENS.USUARIO_NAO_VINCULADO_EMPRESA, HTTP_STATUS.NAO_AUTORIZADO);
    }
    
    if(usuario.empresaId.toString() !== empresaId.toString()){
        throw new AppError(MENSAGENS.USUARIO_NAO_PERTENCE_EMPRESA, HTTP_STATUS.NAO_AUTORIZADO);
    }

    return await usuarioRepository.remover(id);

}

module.exports = { criarUsuario, listarUsuarios, buscarUsuario, atualizarUsuario, removerUsuario }