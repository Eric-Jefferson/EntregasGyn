const express = require('express');
const router = express.Router();

const { autenticar } = require('../auth/auth.middleware');
const { exigirPermissao } = require('../../common/middlewares/permissao.middleware');
const  empresaController = require('./empresa.controller');

router.post("/", autenticar, exigirPermissao("EMPRESA_CRIAR"), empresaController.criar );
router.post('/cadastro', empresaController.cadastrar)


module.exports = router;