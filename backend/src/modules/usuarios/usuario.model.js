const mongoose = require('mongoose');
const PERFIS = require("../../common/constants/perfis");
const STATUS = require("../../common/constants/status");

const usuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength:100
    },
    cpf:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 11,
        maxlength: 11

    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,


    },

    senha:{
        type: String,
        select: false
    },

    telefone:{
        type: String,
        trim: true
    },

    foto:{
        type: String,
        default: null
    },

    perfil:{
        type: String,
        enum: Object.values(PERFIS),
        default: PERFIS.CLIENTE
    },

    status:{
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.ATIVO
        
    },

    empresaId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        index: true,
        default: null
    },

    ultimoLogin:{
        type: Date,
        default: null
    }
},

{
    timestamps: true,
    collection:'usuarios'
}

);

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
