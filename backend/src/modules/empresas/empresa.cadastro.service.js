const mongoose = require('mongoose');
const Empresa = require('./empresa.model');
const Usuario = require('../usuarios/usuario.model');
const STATUS = require('../../common/constants/status')
const { validarCadastroEmpresa } = require('./empresa.validator');
const { gerarCodigoEmpresa } = require("../../common/helpers/codigosEmpresa");
const { normalizarCNPJ } = require('../../common/helpers/formatarCnpj');

const { gerarSlug } = require('../../common/helpers/slug');

const bcrypt = require('bcrypt');

const PERFIS = require('../../common/constants/perfis');
        // =======================================
        // aqui vamos validar os dados do ADMIN
        // =======================================

function validarDadosAdmin(admin){

          
        const erros = [];
        
        if(!admin){
            erros.push("Dados do administrador sao Obrigatorios.")
            return erros;

        }

        if(!admin.nome){
            erros.push("Nome do administrador é Obrigatorio.");
        }

        if (!admin.email){
            erros.push("E-mail do Administrador é Obrigatorio.")
        }

        if (!admin.senha){
            erros.push("A Senha deve possuir no minimo 8 caracteres incluindo numeros e simbolos")
        }

        return erros;
}



        // ====================================
        // aqui vamos Criar as rotas publicas
        // ====================================

async function cadastrarEmpresa(dados){
    try {

    const {empresa:dadosEmpresa, admin} = dados;
        
    const validacao = validarCadastroEmpresa(dadosEmpresa)
        if (!validacao.valido){
            throw new Error(
                validacao.erros.join(" ")
        );
    };
    
    //=======================================
    // vamos conferir a validacao do ADMIN
    //=======================================
    
    const errosAdmin = validarDadosAdmin(admin);
        if (errosAdmin.length > 0){
            throw new Error(errosAdmin.join(" "));
        }

    const cnpj = normalizarCNPJ(dadosEmpresa.cnpj);

    const empresaExistente = await Empresa.findOne({ cnpj });

        if(empresaExistente){
            throw new Error("Ja existe uma empresa Cadastrada com este CNPJ.")
        }

        const emailAdmin = admin.email.toLowerCase().trim();

        const usuarioExistente = await Usuario.findOne({email: emailAdmin})
       
        if(usuarioExistente){
            throw new Error("Este E-mail ja esta Cadastrado.");
        }

        const slug = gerarSlug(dadosEmpresa.nomeFantasia);
        const codigo = gerarCodigoEmpresa()
        const slugExistente = await Empresa.findOne({ slug })

        if(slugExistente){
            throw new Error("Ja existe uma empresa utilizando este Nome.")
        }

    const session = await mongoose.startSession();
   
    try {
            
            session.startTransaction();

        // =====================================
        // aqui vamos comcecar a CRIAR O ADMIN
        // =====================================

    const senhaHash = await bcrypt.hash(admin.senha,12);
    
    const admins = await Usuario.create([{
        nome: admin.nome,
        email:emailAdmin,
        senha: senhaHash,
        perfil: PERFIS.ADMIN,
        status: STATUS.ATIVO,
        empresaId: null
    }], 
    
        { session });

    const novoAdmin = admins[0];    

    
        //============================
        // aqui vamos criar a empresa
        //============================

    const empresas = await Empresa.create([{
        ...dadosEmpresa,
        codigo,
        cnpj,
        slug,
        criadoPor: novoAdmin._id,
        status: "PENDENTE"
    }],
    
    { session })
    
    
    const novaEmpresa = empresas[0];
    
    // ====================================
    // Vamos vincular o  ADMIN À EMPRESA
    // ====================================
        
    novoAdmin.empresaId = novaEmpresa._id;
    
    await novoAdmin.save(
    
        {session});

        // aqui nos confirmamos transaction
    await session.commitTransaction();
    
    return {
        empresa: novaEmpresa,
        admin:{
            id: novoAdmin._id,
            nome: novoAdmin.nome,
            email: novoAdmin.email,
            perfil: novoAdmin.perfil
        }
    };

    } catch (error) {        
    // aqui desfazemos tudo, se der errado  "ROOLBACK"

    await session.abortTransaction();
    throw error;

    } finally {
    
    // aqui encerramos a sessao
    session.endSession();
    }
    
    } catch (error) {
        // propaga erro para quem chamou a função
        throw error;
    }
}

module.exports = {cadastrarEmpresa};
