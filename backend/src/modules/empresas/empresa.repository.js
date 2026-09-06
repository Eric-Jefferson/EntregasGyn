const Empresa = require('./empresa.model');

class EmpresaRepository {
    async criar(dadosEmpresa){
        return await Empresa.create(dadosEmpresa);
    }
    async buscarPorId(id){
        return await Empresa.findById(id);
    }
    async buscarPorCnpj(cnpj){
        return await Empresa.findOne({cnpj});
        
    }
    async buscarPorSlug(slug){
        return await Empresa.findOne({slug});

    }
    async listar(){
        return await Empresa.find();
    }

    async atualizar(id,dadosEmpresa){
        return await Empresa.findByIdAndUpdate(
            id,
            dadosEmpresa,
            { 
                new: true 
            }
        
        );
    }
}

module.exports = new EmpresaRepository();
