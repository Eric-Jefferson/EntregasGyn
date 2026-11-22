const express = require('express');
const Router = express.Router();

const entregadorController = require("./entregador.controller");

const { autenticar } = require('../auth/auth.middleware');
const { exigirPermissao } = require('../../common/middlewares/permissao.middleware');
const PERMISSOES = require('../../common/constants/permissoes');


Router.post("/", 
    autenticar, 
    exigirPermissao(PERMISSOES.ENTREGADOR_CRIAR),
    entregadorController.criar);


module.exports = Router;