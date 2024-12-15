//Comando para crear el User
const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const User = require("../models/User");
const { where } = require("sequelize");

const paladinButton = new ButtonBuilder()
  .setCustomId("paladin")
  .setEmoji("🛡️")
  .setLabel("Paladin")
  .setStyle(ButtonStyle.Success);

const warriorButton = new ButtonBuilder()
  .setCustomId("warrior")
  .setEmoji("⚔️")
  .setLabel("Guerrero")
  .setStyle(ButtonStyle.Primary);

const mageButton = new ButtonBuilder()
  .setCustomId("mage")
  .setEmoji("🧙‍♂️")
  .setLabel("Mago")
  .setStyle(ButtonStyle.Success);

const astrologistButton = new ButtonBuilder()
  .setCustomId("astrologist")
  .setEmoji("🔮")
  .setLabel("Astrologo")
  .setStyle(ButtonStyle.Primary);

module.exports = {
  description:
    "Crea el Usuario, permite seleccion de clase, solo un uso por usuario",
  run: async (message) => {
    const target = message.mentions.users.first() || message.author;
    const member = await message.guild.members.fetch(target.id);
    let interactionWithButton = false;
    const user = await User.findOne({
      where: { discord_id: `${member.user.id}` },
    });
    //BORRAR esta linea: borra todo
    // const updated = await User.destroy({
    //     where: {}
    // });

    if (user) {
        const reply = await message.reply({
            content: `🚫Este comando solo puede ser usado una vez por Usuario🚫`,
        });
    } else {
      const actionRow = new ActionRowBuilder().addComponents(
        paladinButton,
        warriorButton,
        mageButton,
        astrologistButton
      );
      const reply = await message.reply({
        content: `Bienvenido a MMBOT **${member.user.displayName}**, por favor seleccione una clase:`,
        components: [actionRow],
      });
      //creo el filtro para que solo funcione con el autor del mensaje:
      const filter = (interaction) =>
        interaction.user.id === message.author.id &&
        interaction.message.id === reply.id;

      const collector = message.channel.createMessageComponentCollector({
        filter,
        time: 60 * 1000, //1 min de duracion
      });
      collector.on("collect", async (interaction) => {
        let newUser;
        interactionWithButton = true;
        switch (interaction.customId) {
          case "paladin":
            interaction.update({
              content: `Tu clase es **Paladin**, Estadisticas: **+armadura, +vida, daño fisico**`,
              components: [],
            });
            newUser = await User.create({
                discord_id: `${member.user.id}`,
                class: "paladin",
                hasJoined: true,
                armor: 20,
                fisical_damage: 10,
                max_health: 200,
            });
            break;
          case "warrior":
            interaction.update({
              content: `Tu clase es **Guerrero**, Estadisticas: **+prob. crit, daño fisico**`,
              components: [],
            });
            newUser = await User.create({
                discord_id: `${member.user.id}`,
                class: "warrior",
                hasJoined: true,
                fisical_damage: 10,
                crit_chance: 0.1,
            });
            break;
          case "mage":
            interaction.update({
              content: `Tu clase es **Mago**, Estadisticas: **+prob. crit, daño Magico**`,
              components: [],
            });
            newUser = await User.create({
                discord_id: `${member.user.id}`,
                class: "mage",
                hasJoined: true,
                magic_damage: 10,
                crit_chance: 0.1,
            });
            break;
          case "astrologist":
            interaction.update({
              content: `Tu clase es **Astrologo**, Estadisticas: **+armadura, +vida, daño magico**`,
              components: [],
            });
            newUser = await User.create({
                discord_id: `${member.user.id}`,
                class: "astrologist",
                hasJoined: true,
                armor: 20,
                magic_damage: 10,
                max_health: 200,
            });
            break;
          default:
            break;
        }
      });
      collector.on("end", async () => {
        if (!interactionWithButton) {
          reply
          .edit({
            content: "Mensaje expirado",
            components: [],
          })
          .catch(console.error);
        }
      });
    }
  },
};
