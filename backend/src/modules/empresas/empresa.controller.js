const empresaService = require('./empresa.service');
const empresaCadastroService = require ('./empresa.cadastro.service');


async function criar(req,res){
    try{

        const empresa = await empresaService.criarEmpresa( req.body, req.usuario );
        
            return res.status(201).json({
                sucesso:true,
                mensagem:"Empresa Criada Com sucesso."
            });

    }catch (error){  
        console.error("❌ ERRO AO CRIAR EMPRESA:");
        console.error(error);
        console.error("MENSAGEM:", error.message);
        console.error("STACK:", error.stack);


        return res.status(500).json({
            sucesso: false,
            mensagem: error.message
        });

    }
}

// rota publica
async function cadastrar(req,res){
    try{
        
        const resultado = await empresaCadastroService.cadastrarEmpresa(req.body);
        console.log("========CONTROLLER.JS===============")
        console.log("RESULTADO: ", resultado);
        console.log("=======================")
        return res.status(201).json({
            sucesso: true,
            mensagem:"Empresa Cadastrada Com Sucesso!",
            dados: resultado
        })
        }catch (error){
        console.error("❌ ERRO NO CADASTRO DA EMPRESA:");
        console.error(error);
        return res.status(400).json({
            sucesso: false,
            mensagem:error.message
        });
    }
}

module.exports = { criar, cadastrar }


