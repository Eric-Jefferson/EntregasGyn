class AppError extends Error {
    constructor(mensagem,statusCode){
        super(mensagem);
        this.statusCode= statusCode;
        this.name = "AppError";
    }
}


module.exports = AppError;