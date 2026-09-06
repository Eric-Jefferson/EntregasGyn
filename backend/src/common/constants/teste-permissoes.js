const PERFIS_PERMISSOES = require ('./perfis-permissoes');
const PERFIS= require('./perfis');



console.log("====================================");
console.log("TESTE DE PERMISSÕES");
console.log("====================================");

console.log("MASTER_ADMIN:", PERFIS_PERMISSOES[PERFIS.MASTER_ADMIN]);

console.log("ADMIN:",PERFIS_PERMISSOES[PERFIS.ADMIN]);

console.log(
    "FINANCEIRO:",
    PERFIS_PERMISSOES[PERFIS.FINANCEIRO]
);


console.log(
    "ENTREGADOR:",
    PERFIS_PERMISSOES[PERFIS.ENTREGADOR]
);

//node src/common/constants/teste-permissoes.js