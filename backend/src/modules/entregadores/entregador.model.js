const mongoose = require('mongoose');

const { 
    STATUS_ENTREGADOR,
    DISPONIBILIDADE_ENTREGADOR,
    TIPOS_VEICULO  
} = require('../../common/constants/entregador.constants');

const veiculoSchema = new mongoose.Schema (
    {
        tipo:
        {
            type: String,
            enum: Object.values(TIPOS_VEICULO),
            required: true
        },
    
    marca:
        {
            type: String,
            trim: true,
            maxlength: 20
        },
    
    modelo:
        {
            type: String,
            trim: true,
            maxlength: 20
        },

    placa: 
        {
            type: String,
            trim: true,
            uppercase: true,
            maxlength: 7
        },
    cor: 
        {
            type: String,
            trim: true,
            maxlength: 20
        }
    },
    
    {
        _id: false,
    }            

);

const entregadorSchema = new mongoose.Schema(
{
    usuarioId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
        unique: true,
        index: true
    },

    empresaId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Empresa",
        required: true,
        index: true
    },

    status: {
        type: String,
        enum: Object.values(STATUS_ENTREGADOR),
        default: STATUS_ENTREGADOR.ATIVO
    },
    
    disponibilidade:{
        type: String,
        enum: Object.values(DISPONIBILIDADE_ENTREGADOR),
        default: DISPONIBILIDADE_ENTREGADOR.OFFLINE
    },

    veiculo:{
        type: veiculoSchema,
        default: null
    }
},  
    {
        timestamps: true,
        collection: "entregadores"
    }
);

module.exports = mongoose.model("Entregador", entregadorSchema);