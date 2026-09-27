const Entregador = require('./entregador.model');

class EntregadorRepository {
    
    async criar(dados, session = null){
        
        const entregador = new Entregador(dados);

        if(session){
            await entregador.save({ session });

        }else{
            await entregador.save();
        }
        
        return entregador;
    }

    async buscarporId(id){
        return await Entregador.findById(id)
                    
    }

      async buscarPorUsuarioId(usuarioId) {
        return await Entregador.findOne({ usuarioId });
    }

    async listarPorEmpresa(empresaId) {
        return await Entregador.find({ empresaId });
    }

    async atualizar(id,dados){
        return await Entregador.findByIdAndUpdate(
            id,
            dados,
            {
                returndocument: "after",
                runValidators: true
            }).select("-senha");

    }

}

module.exports = new EntregadorRepository();
