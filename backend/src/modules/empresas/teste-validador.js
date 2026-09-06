
const {   validarCadastroEmpresa,
    validarCNPJ,
    normalizeCNPJ
 } = require("./empresa.validator.js");


const dados = {
    
    nomeFantasia: "Entregas Gyn",

    razaoSocial: "Entregas Gyn LTDA",

    cnpj: "11.444.777.0001-61",

    emailPrincipal: "contato@entregasgyn.com",

    telefone: "62999999999",
    
    responsavel: {
        nome: "João"
    },
   
    endereco: {
        cidade: 'Goiania',
        estado: "go"
    }
}

const resultado = validarCadastroEmpresa(dados);
console.log(resultado)


// node src/modules/empresas/teste-validador.js