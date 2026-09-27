const express = require('express');
const Router = express.Router();

router.post ("/testeentregador", EntregadorController.testeEntregador);

module.exports = Router;