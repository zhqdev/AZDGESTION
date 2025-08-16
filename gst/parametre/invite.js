const Discord = require("discord.js");
const db = require('quick.db');
const config = require("../config");
const owner = new db.table("Owner")

module.exports = {
    name: 'invite',
    usage: 'invite <id>',
    description: `Permet de créer une invitation pour un serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)  ) {

            const guildID = args[0];
            if (isNaN(guildID) || !guildID) {
                return message.channel.send(`Vous devez indiquer l'id du serveur pour créer une invitation.`);
            } else {
                const guild = client.guilds.cache.get(guildID);
                if (guild === undefined) return message.channel.send(`Votre bot n'est pas sur ce serveur.`);
                if (!guild.available) return message.channel.send('Serveur non disponible, réessayez plus tard.');

                const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'));
                if (!channel) return;

                channel.createInvite({ maxAge: 0, maxUses: 1, unique: true })
                    .then(invite => {
                        message.author.send(`Voici votre invitation pour le serveur ${guild.name}: ${invite.url}`).catch(() => {
                            message.channel.send(`Voici votre invitation pour le serveur ${guild.name}: ${invite.url}`);
                        });
                    });
            }
        }
    }
}
