const { Sequelize } = require("sequelize");

require("dotenv").config();
const password = process.env.BDD;

const port = process.env.PORT;

const sequelize = new Sequelize('discord_bot', 'postgres', `${password}`,{
    host: 'localhost',
    dialect: 'postgres',
    port: port,
});

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Conexión a la base de datos establecida con éxito.');
//     } catch (error) {
//         console.error('No se pudo conectar con la base de datos', error);
//     }
// })();

module.exports = sequelize;