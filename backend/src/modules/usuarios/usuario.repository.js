const Usuario = require('./usuario.model');

class UsuarioRepository{
    async criar(dados,session = null){
        const usuario = new Usuario(dados);
        if(session){
            await usuario.save({session});
        }else{
            await usuario.save();
        }

        return Usuario;
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

    async atualizarSenha (id, senha){

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
