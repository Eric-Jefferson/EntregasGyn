const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
    codigo:{ 
        type: String,
        unique: true,
        trim: true

    },

    nomeFantasia:{
        type: String,
        required: true,
        trim: true
    },
    razaoSocial:{
        type: String,
        required: true,
        trim: true
    },
    cnpj:{
        type: String,
        required:true,
        unique: true,
        index: true,
        trim: true
    },
    inscricaoEstadual:{
        type: String,
        trim: true
    },
    inscricaoMunicipal:{
        type:String,
        trim: true
    },
    emailPrincipal:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    telefone:{
        type: String,
        trim:true
    },
    whatsapp:{
        type: String,
        trim: true
    },
    site:{
        type: String,
        trim: true
    },

    responsavel:{
        nome:{
            type: String,
            required:true,
            trim:true
        },
        cpf:{
            type: String,
            required:true,
            trim:true
        },
        telefoneResponsavel:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        cargo:{
            type: String,
            trim:true
        }
    },
    endereco:{
        cep:{
            type: String,
            required: true,
            trim: true
        },
        logradouro:{
            type: String,
            required:true,
            trim: true
        },
        numero:{
            type: String,
            required: true,
            trim: true
        },
        complemento:{
            type: String,
            trim: true
        },
        cidade:{
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },
        referencia:{
            type: String,
            trim: true
        },
        latitude:{
            type: Number,
        },
        longitude:{
            type: Number
        }
    },
        
    
    slug:{
        type: String,
        required:true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    plano:{
        type: String,
        required: true,
        enum:["BRONZE", "PRATA", "OURO","DEMO"],
        default: "BRONZE"
    },

    status:{
        type : String,
        required: true,
        enum:["ATIVO", "INATIVO","BLOQUEADO","CANCELADO","PENDENTE","SUSPENSO"],
        default: "ATIVO"
    },
    logo:{
        type: String,
        trim: true
    },

    configuracoes:{
        exibiFotoEntrega:{
            type: Boolean,
            default: false
        },
        exibirAssinatura:{
            type: Boolean,
            default: false
        },
        aceitarDistribuicaoAutomatica:{
            type: Boolean,
            default: false
        },
        tempoMaximoAceite:{
            type: Number,
            default: 5
        },
        tempoMaximoColeta:{
            type:Number,
            default: 10
        }
        
    },
    criadoPor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    atualizadoPor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",

    },
    desativadoEm:{
        type: Date
    },
    desativadoPor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    motivoDesativacao:{
        type: String,
        trim: true
    }
},

    {
    timestamps: true
    }
 );

const Empresa = mongoose.model('Empresa', empresaSchema); 
module.exports = Empresa; 