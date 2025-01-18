const { EmbedBuilder } = require("discord.js");
const User = require("../models/User");

module.exports = {
  description: "Trae una lista de todos los objetos que el usuario posee:",
  run: async (message) => {
    const target = message.mentions.users.first() || message.author;
    const member = await message.guild.members.fetch(target.id);

    const user = await User.findOne({
      where: { discord_id: `${member.user.id}` },
    });
    if (user) {
      const weapons = await user.getWeapons();
      console.log(weapons[1].dataValues);
      const inventoryEmbed = new EmbedBuilder()
        .setTitle(`**Inventario de: ${message.author.displayName}**`)
        .setColor("#FFD700")

        for (let index = 0; index < weapons.length; index++) {
          const element = weapons[index].dataValues;
          inventoryEmbed.addFields(
            {name: `\u200B`, value: `${index+1}: ${element.name}`}
          )
        }
        const reply = await message.reply({
          embeds: [inventoryEmbed]
        })
    }else{
      message.reply({
        content: "No se encontraron datos para el usuario: "+ `${message.author.displayName}`
      })
    }
  },
};
