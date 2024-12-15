const { Client, Events } = require("discord.js");

const sequelize = require('./db');
const User = require('./models/User');
const Weapon = require('./models/Weapon');
const Armor = require('./models/Armor');
//Conexiones:
User.hasMany(Weapon);
Weapon.belongsTo(User);
//
require("dotenv").config();
const token = process.env.TOKEN;

const client = new Client({
    intents: 53608447,
});

client.on(Events.ClientReady, async () => {
    console.log(`Conectado como: ${client.user.username}`);
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
        await sequelize.sync({alter: true});
        console.log('Modelos Sincronizados correctamente');
        
    } catch (error) {
        console.error('No se pudo conectar con la base de datos', error);
    }
});

client.on(Events.MessageCreate, async (message) =>{
    if (message.author.bot) {
        return;
    }
    if(!message.content.startsWith('-')) return;

    const args = message.content.slice(1).split(' ')[0].toLowerCase();
    try {
        const command = require(`./commands/${args}`);
        command.run(message);
    } catch (error) {
        console.log(`Ha ocurrido un error al utilizar el comando -${args}`, error.message);
    }
})

client.login(
    `${token}`
    );