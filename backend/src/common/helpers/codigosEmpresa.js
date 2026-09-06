function gerarCodigoEmpresa(){

    const numero = Date.now().toString().slice(-6);

    return `EG-${numero}`;
}

module.exports = { gerarCodigoEmpresa };