const PERFIS_PERMISSOES = require("../constants/perfis-permissoes");

function exigirPermissao(permissao) {

    return function (req, res, next) {

        try {

            if (!req.usuario) {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: "Usuario nao autenticado."
                });
            }

            const perfil = req.usuario.perfil;
            const permissoesDoPerfil =
            PERFIS_PERMISSOES[perfil] || [];
                     

            const possuiPermissao =
                permissoesDoPerfil.includes(permissao);

            if (!possuiPermissao) {
                return res.status(403).json({
                    sucesso: false,
                    mensagem: "Usuario nao possui permissao"
                });
            }

            next();

        } catch (error) {

            console.log("❌ ERRO AO VERIFICAR PERMISSÃO:");
            console.log(error);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao verificar permissao."
            });
        }
    };
}

module.exports = {
    exigirPermissao
};