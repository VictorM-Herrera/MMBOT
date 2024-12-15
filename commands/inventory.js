const User = require("../models/User");

module.exports = {
  description: "Trae una lista de todos los objetos que el usuario posee:",
  run: async () => {
    const target = message.mentions.users.first() || message.author;
    const member = await message.guild.members.fetch(target.id);

    const user = await User.findOne({
      where: { discord_id: `${member.user.id}` },
    });
    if (user) {
            
    }
  },
};
