const  empresaRepository = require("./empresa.repository");
const { validarCadastroEmpresa } = require("./empresa.validator")
const { normalizarCNPJ } = require('../../common/helpers/formatarCnpj');
const { gerarSlug } = require('../../common/helpers/slug');


//==============================
// este fluxo abaixo é PRIVADO
//===============================

async function criarEmpresa(dados,usuarioAutenticado){
    //1. validar os dados recebidos
    const validacao = validarCadastroEmpresa(dados);
   
    if(!validacao.valido){
        throw new Error(validacao.erros.join(" "));
    }

    //2. normalize cnpj

    const cnpj = normalizarCNPJ(dados.cnpj);

    //3. verificar se o cnpj ja esta cadastrado

    const empresaExistente = await empresaRepository.buscarPorCnpj( cnpj );
    
    if (empresaExistente){
        throw new Error ("Ja existe uma empresa cadastrada com esta cnpj")
    };

    // 4.
    const slug = gerarSlug(dados.nomeFantasia);

    // 4.1
    const slugExistente = await empresaRepository.buscarPorSlug(slug);
        if(slugExistente){
            throw new Error("ja existe uma empresa utilizando este nome")
        }
    // 5.
        const dadosEmpresa = {
            ...dados,
            cnpj,
            slug,
            criadoPor: usuarioAutenticado.sub
        };
    
    //6. Criar Empresa

    const empresa = await empresaRepository.criar(dadosEmpresa);

    //7. retornar a EMPREA CRIADA
    return empresa;
}


module.exports = { criarEmpresa };