const express = require ('express');
const router = express.Router();

const { autenticar } = require('../auth/auth.middleware');
const { exigirPermissao } = require('../../common/middlewares/permissao.middleware');
const usuarioController = require('./usuario.controller');

// ROTA PARA LISTAR
router.get("/", autenticar,exigirPermissao("USUARIO_VISUALIZAR"), usuarioController.listar)

// ROTA PARA BUSCAR
router.get("/:id", autenticar, exigirPermissao("USUARIO_BUSCAR"),usuarioController.buscar)

// ROTA PARA CRIAR
router.post("/", autenticar, exigirPermissao("USUARIO_CRIAR"), usuarioController.criar );

//ATUALIZAR
router.put("/:id", autenticar, exigirPermissao("USUARIO_ATUALIZAR"), usuarioController.atualizar);

// ALTERAR SENHA
router.patch("/:id/senha", autenticar, exigirPermissao("USUARIO_ALTERAR_SENHA"), usuarioController.alterarSenha);

// REMOVER
router.delete("/:id", autenticar, exigirPermissao("USUARIO_APAGAR"), usuarioController.remover)



module.exports = router;