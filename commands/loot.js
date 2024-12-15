const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const {
  generateWeaponStats,
  determineRarity,
  generateWeaponName,
} = require("../middleware/weaponGenerator");
const User = require("../models/User");
const Weapon = require("../models/Weapon");
const { where } = require("sequelize");
const claimButton = new ButtonBuilder()
  .setCustomId("claim")
  .setEmoji("📦")
  .setStyle(ButtonStyle.Secondary);
  const goldButton = new ButtonBuilder()
  .setCustomId("getGold")
  .setEmoji("🪙")
  .setStyle(ButtonStyle.Secondary);
module.exports = {
  description: "Genera loot (armas/armaduras)",
  run: async (message) => {
    const target = message.mentions.users.first() || message.author;
    const member = await message.guild.members.fetch(target.id);

    const user = await User.findOne({
      where: { discord_id: `${member.user.id}` },
    });
    let interactionWithButton = false;
    if (user) {
      const actionRow = new ActionRowBuilder().addComponents(claimButton, goldButton);
      let rarityColor;
      const rarity = determineRarity();
      switch (rarity) {
        case "epica":
          rarityColor = "#8e44ad";
          break;
        case "legendaria":
          rarityColor = "#f39c12";
          break;
        case "rara":
          rarityColor = "#3498db";
          break;
        default:
          rarityColor = "#95a5a6";
          break;
      }
      const weapon = generateWeaponStats(rarity, user.dataValues.level);
      console.log(weapon);
      const weaponName = generateWeaponName(rarity);
      const weaponEmbed = new EmbedBuilder()
        .setTitle(`**${weaponName}**`)
        .setColor(rarityColor)
        .addFields(
          { name: "Nivel", value: `${weapon.level}`},
          { name: "⚔️Daño Ataque:", value: `${weapon.true_damage}`, inline: true },
          { name: "🗡️Daño Físico:", value: `${weapon.fisical_damage}`, inline: true },
          { name: "⚕️Daño Mágico:", value: `${weapon.magic_damage}`, inline: true },
          { name: "🎯Prob. Crítico:", value: `${weapon.crit_chance}`, inline: true },
          { name: "💢Daño Crítico:", value: `${weapon.crit_damage}`, inline: true },
          { name: "🏹Velocidad Ataque:", value: `${weapon.atack_speed}`, inline: true },
          { name: "🪙Oro:", value: `${weapon.price}`},
        );
      const reply = await message.reply({
        embeds: [weaponEmbed],
        components: [actionRow],
      });
      const collector = message.channel.createMessageComponentCollector({
        time: 30 * 1000, //1 min de duracion
      });
      collector.on("collect", async (interaction) => {
        if (interaction.customId == "claim") {
          interactionWithButton = true;
          const interactionUser = User.findOne({
            where: { discord_id: interaction.user.id },
          });
          if (interactionUser) {
            const updatedEmbed = new EmbedBuilder(weaponEmbed)
            .setFooter({
              text: `Pertenece a ${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL(),
            });
            const newWeapon = Weapon.create({
              name: weaponName,
              true_damage: weapon.true_damage,
              fisical_damage: weapon.fisical_damage,
              magic_damage: weapon.magic_damage,
              crit_chance: weapon.crit_chance,
              crit_damage:weapon.crit_damage,
              atack_speed: weapon.atack_speed,
              fisical_pen: weapon.fisical_pen,
              magic_pen:weapon.magic_pen,
              price:weapon.price,
              level: weapon.level,
              rarity: rarity,
              UserId: user.dataValues.discord_id
            });

            await interaction.update({
              embeds: [updatedEmbed],
              components: [],
            });
          }
        }else if(interaction.customId == "getGold"){
          interactionWithButton = true;
          const interactionUser = await User.findOne({
            where: { discord_id: interaction.user.id },
          });
          if (interactionUser) {
            const newGold = interactionUser.dataValues.gold + weapon.price;
            const updatedUser = await User.update({gold: newGold},{where: {discord_id: interactionUser.dataValues.discord_id}})
            if (updatedUser) {
              await interaction.update({
                content: `Se han sumado $${weapon.price} de oro al Usuario: ${interaction.user.username}, Nuevo total: $${newGold}`,
                embeds: [],
                components: [],
              })
            }
          }
        }
      });

      collector.on("end", async () => {
        if (!interactionWithButton) {
          reply
          .edit({
            embeds: [weaponEmbed],
            components: [],
          })
          .catch(console.error);
        }
      });
    }
  },
};
