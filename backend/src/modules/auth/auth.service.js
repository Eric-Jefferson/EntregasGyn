const bcrypt = require("bcrypt");
const Usuario = require("../usuarios/usuario.model");

const { gerarToken } = require("../../common/helpers/jwt")

async function criarUsuario(dados){
    const {nome,cpf,email,senha,telefone,perfil, empresaId} = dados;

    // verificar se o email. ja existe
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente){
        throw new Erro("ja exist um usuario cadastrado com este Email.")
    }

    // transformar a senha em hash
    const senhaHash = await bcrypt.hash(senha,12);
    // criar usuario 
    const usuario = await Usuario.create({
    nome,
    cpf,
    email,
    senha: senhaHash,
    telefone,
    perfil,
    empresaId
});

    return {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        perfil: usuario.perfil,
        empresaId: usuario.empresaId
    };
}

async function login(email,senha){
    //buscar usuario incluindo a senha
    const usuario = await Usuario
    .findOne({ email })
    .select("+senha");

    if (!usuario){
        throw new Error("E-mail ou senha invalidos.");
    }

    //comparar senha infomada com hash armzenado
    const senhaValida = await bcrypt.compare(senha,usuario.senha);

    if(!senhaValida){
        throw new Error ("E-mail ou senha invalidos.");
    }
    //Atualizar ultimo Login
    usuario.ultimoLogin = new Date();
    
    await usuario.save();
    
    // aqui vamos gerar o tokem
    const token = gerarToken(usuario)


    return {
        token,
        usuario:{
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            perfil: usuario.perfil,
            empresaId: usuario.empresaId,
            status: usuario.status
        }
    }
}

module.exports = { criarUsuario, login };