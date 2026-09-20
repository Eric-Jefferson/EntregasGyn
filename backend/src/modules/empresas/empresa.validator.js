const { validarCNPJ } = require("../../common/helpers/formatarCnpj")
function validarCadastroEmpresa(dados){
    const erros = [];

    if(!dados.nomeFantasia){
        erros.push("Nome fantasia é obrigatório.");
    }

    if (!dados.razaoSocial){
        erros.push("Razão social é obrigatória.");

    }
    
    if(!dados.cnpj){
        erros.push("CNPJ é obrigatório.")
    } else if (!validarCNPJ(dados.cnpj)){
        erros.push("CNPJ invalido.")
    } 

    if(!dados.emailPrincipal){
        erros.push("E-mail principal é obrigatório.")
    }

    if(!dados.telefone){
        erros.push("Telefone é obigatório.")
    }

    if(!dados.responsavel){
        erros.push("Responsavel é obrigatório.")
    }
    
    if(!dados.endereco){
        erros.push("endereço é obrigatório.")
    }
    return {
        valido: erros.length === 0, 
        erros
    };
}



module.exports = { validarCadastroEmpresa };