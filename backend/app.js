const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./src/modules/auth/auth.routes")
const apiRoutes = require("./src/routes/api.routes");
const empresaRoutes = require('./src/modules/empresas/empresa.routes')
const usuariosRoutes = require('./src/modules/usuarios/usuario.routes')
const app = express();

// aqui sao as middlewares.....
app.use(helmet()); // protege a API adicionando cabeçalhos de segurança
app.use(cors()); // permite que o frontend converse com o backend 
app.use(express.json());// transforma o JSON enviado pelo navegador em objeto JavaScript
app.use(morgan("dev"));// Mostra no terminal:GET / 200 5ms, Muito útil durante o desenvolvimento.
app.use("/auth",authRoutes);
app.use("/", apiRoutes);//
app.use("/empresas", empresaRoutes);
app.use("/usuarios", usuariosRoutes)

module.exports = app;

