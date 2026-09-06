const express = require("express");
const {obterUsuarioAutenticado, realizarLogin } = require("../auth/auth.controller")
const { exigirPermissao } = require ('../../common/middlewares/permissao.middleware')
const { autenticar } = require("../auth/auth.middleware")

const router = express.Router();

router.get("/me", autenticar , obterUsuarioAutenticado);
router.post("/login",realizarLogin)


module.exports = router ;