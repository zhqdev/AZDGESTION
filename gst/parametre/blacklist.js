const Discord = require("discord.js");
const db = require("quick.db");
const cl = new db.table("Color");
const config = require("../config");
const footer = config.bot.footer;

module.exports = {
    name: 'bl',
    usage: 'bl <membre/clear>',
    description: `Permet de mettre dans la blacklist des membres.`,
    async execute(client, message, args) {
        if (config.bot.buyer.includes(message.author.id)) {
            let color = cl.fetch(`color_${message.guild.id}`);
            if (color == null) color = config.bot.couleur;

            if (args[0] === 'clear') {
                db.delete(`${config.bot.blacklist}.blacklist`);
                return message.channel.send(`La liste noire a été effacée.`);
            }

            if (args[0]) {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``);

                if (db.get(`${config.bot.blacklist}.${member.id}`) === member.id) { 
                    return message.channel.send(`${member.user.username} est déjà blacklisté.`); 
                }

                db.push(`${config.bot.blacklist}.blacklist`, member.id);
                db.set(`${config.bot.blacklist}.${member.id}`, member.id);
                member.kick(`Blacklisté par ${message.author.username}`);
                return message.channel.send(`<@${member.id}> est maintenant dans la blacklist.`);
            } else {
                let own = db.get(`${config.bot.blacklist}.blacklist`);
                let p0 = 0;
                let p1 = 30;
                let page = 1;

                let embed = new Discord.MessageEmbed()
                    .setTitle("Blacklist")
                    .setColor(color)
                    .setDescription(!own ? "Aucun" : own.map((user, i) => `<@${user}>`).slice(0, 30).join("\n"))
                    .setFooter({ text: `${footer}` });
                return message.channel.send({ embeds: [embed] });
            }
        }
    }
};
