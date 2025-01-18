const User = require("../models/User");
const { description } = require("./loot");

module.exports = {
    description: "Sube de nivel al usuario",
    run: async (message) => {
        const target = message.mentions.user.first() || message.author;
        const member = await message.guild.members.fetch(target.id);

        const user = await User.findOne({
            where: {discord_id: `${member.user.id}`}
        });

        if(user){
            message.reply({
                content: `Seguro que quieres gastar $${"oro"} en subir a nivel: ${sdas}`
            })
        }
    }
}