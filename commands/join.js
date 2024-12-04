//Comando para crear el User
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require ("discord.js");

const paladinButton = new ButtonBuilder()
.setCustomId('paladin')
.setEmoji('🛡️')
.setLabel('Paladin')
.setStyle(ButtonStyle.Success);

const warriorButton = new ButtonBuilder()
.setCustomId('warrior')
.setEmoji('⚔️')
.setLabel('Guerrero')
.setStyle(ButtonStyle.Success);
                                                               
const mageButton = new ButtonBuilder()
.setCustomId('mage')
.setEmoji('🧙‍♂️')
.setLabel('Mago')
.setStyle(ButtonStyle.Primary);

const astrologistButton = new ButtonBuilder()
.setCustomId('astrologist')
.setEmoji('🔮')
.setLabel('Astrologo')
.setStyle(ButtonStyle.Primary);

module.exports = {
    description: 'Crea el Usuario, permite seleccion de clase, solo un uso por usuario',
    run: async (message) => {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);
        message.reply(`Bienvenido a MMBOT **${member.user.displayName}**, por favor seleccione una clase:`);

        
    }
}