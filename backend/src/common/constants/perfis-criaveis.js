const PERFIS = require('./perfis');

module.exports = Object.freeze({
    [PERFIS.MASTER_ADMIN]:[
        PERFIS.SUPER_ADMIN
        
    ],

    [PERFIS.ADMIN]:[
        PERFIS.OPERADOR,
        PERFIS.FINANCEIRO,
        PERFIS.ENTREGADOR,
        PERFIS.CLIENTE
    ]
});