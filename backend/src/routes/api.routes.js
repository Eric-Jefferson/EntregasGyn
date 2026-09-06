const express = require("express");
const router = express.Router(); //criamos um agrupador de rotas


//PRIMEIRA ROTA

router.get("/", (req,res) =>{

    return res.status(200).json({
        success: true,
        message:"API Entregas Gyn Funcionando"
    });
});




module.exports = router;