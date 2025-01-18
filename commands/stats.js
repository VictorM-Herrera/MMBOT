
const { EmbedBuilder } = require("discord.js");
const User = require("../models/User");

//Comando para revisar las estadisticas del usuario.
module.exports = {
    description: "Muestra las estadisticas del Usuario",
    run: async (message) => {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);

        const user = await User.findOne({where: {discord_id : `${member.user.id}`}});
        if (user) {
            const statsEmbed = new EmbedBuilder()
            .setTitle(`Estadisticas:`)
            .setColor('#FFD700')
            .addFields(
                { name: "Clase", value: `${user.dataValues.class}`, inline: true},
                { name: "Nivel", value: `${user.dataValues.level}`, inline: true},
                { name: "🪙Oro:", value: `${user.dataValues.gold}`, inline: true },
                { name: "❤️Vida Máx:", value: `${user.dataValues.max_health}`, inline: true },
                { name: "⚔️Daño Ataque:", value: `${user.dataValues.true_damage}`, inline: true },
                { name: "🗡️Daño Físico:", value: `${user.dataValues.fisical_damage}`, inline: true },
                { name: "⚕️Daño Mágico:", value: `${user.dataValues.magic_damage}`, inline: true },
                { name: "🛡️Armadura:", value: `${user.dataValues.armor}`, inline: true },
                { name: "Armadura Física:", value: `${user.dataValues.fisical_armor}`, inline: true },
                { name: "Armadura Mágica:", value: `${user.dataValues.magic_armor}`, inline: true },
                { name: "🎯Prob. Crítico:", value: `${user.dataValues.crit_chance}`, inline: true },
                { name: "💢Daño Crítico:", value: `${user.dataValues.crit_damage}`, inline: true },
                { name: "🏹Velocidad Ataque:", value: `${user.dataValues.atack_speed}`, inline: true }
            )
            .setFooter({text: `Estadisticas del usuario: ${message.author.displayName}`, iconURL: message.author.displayAvatarURL() });

            const reply = await message.reply({ embeds: [statsEmbed]});
        };
    }
}