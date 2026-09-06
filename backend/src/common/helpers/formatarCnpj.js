console.log("entrou em common formatarCNPJ")
function normalizarCNPJ(cnpj){
    if (!cnpj) 
        return "";

    return cnpj.replace(/\D/g, "")

}


function validarCNPJ(cnpj){
   
    cnpj = normalizarCNPJ(cnpj);
    
    if (cnpj.length !== 14){
        return false;
    }
    if(/^(\d)\1{13}$/.test(cnpj)){
        return false;
    }
    let soma = 0
    let peso = 5

    for (let i = 0; i<12; i++){
        soma += Number(cnpj[i]) * peso;
        peso --;
    
        if (peso === 1){
            peso = 9;
        }    
    }

    let resto = soma % 11;
    let primeiroDigito = resto<2? 0 : 11- resto;

    if (Number(cnpj[12]) !== primeiroDigito){
        return false;
    }
    
    soma = 0;
    peso = 6;

    for (let i = 0; i <13; i++){
        soma += Number(cnpj[i])*peso;
        peso --;

        if (peso ===1){
            peso = 9;
        }
    }
    
    resto = soma % 11;
    let segundoDigito = resto <2 ? 0: 11 - resto;

        if(Number(cnpj[13])!== segundoDigito){
            return false;
        }

    return true;
       
};

module.exports = { normalizarCNPJ ,  validarCNPJ };