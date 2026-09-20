const Usuario = require('./usuario.model');
class UsuarioRepository{
    async criar(dados){
        return await Usuario.create(dados);
    }

    async buscarPorId(id){
        return await Usuario.findById(id);
    }
    async buscarPorEmail(email){
        return await Usuario.findOne({ email })
                     .select("+senha");
    }

    async buscarPorCpf(cpf){
        return await Usuario.findOne({ cpf });
    }
    
    
    async listarPorEmpresa(empresaId){

        return await Usuario.find({ empresaId })
                     .select("-senha");

    } 

    async atualizar(id, dados){
        return await Usuario.findByIdAndUpdate(
            id,
            dados,
            {
                returnDocument: 'after',
                runValidators: true
            }).select("-senha");
    }
    async remover(id){
        return await Usuario.findByIdAndDelete(id);
        
    }

    async atualizarsenha (id, senha){

        return await Usuario.findByIdAndUpdate(
            id,
            {senha},
            {
                returnDocument: 'after',
                runValidators: true
            }

        ).select("-senha");
    }
}

module.exports = new UsuarioRepository();
