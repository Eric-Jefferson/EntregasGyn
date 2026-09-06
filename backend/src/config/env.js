require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development" ,
    APP_NAME: process.env.APP_NAME || "Entregas Gyn API" ,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET 
};

