const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const ticketlog = new db.table("ticketlog")
const footer = config.bot.footer


module.exports = {
    name: 'ticketlog',
    usage: 'ticketlog <id>',
    description: `Permet de changer le salon des logs ticket.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (ticketlog.get(`${message.guild.id}.ticketlog`) === newChannel) return message.channel.send(`✉️・__Nouveau salon des logs tickets :__ \`${ticketlog.get(`${message.guild.id}.ticketlog`)}\``)
            else {
                ticketlog.set(`${message.guild.id}.ticketlog`, newChannel.id)
                message.channel.send(`✉️・__Nouveau salon des logs Tickets :__ ${args[0]}`)

                const logs = ticketlog.get(`${message.guild.id}.ticketlog`)

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`${message.author.tag} a défini ce salon commme salon des logs tickets`)
                    .setDescription(`✉️ | Ce salon est désormais utilisé pour __toutes__ les **logs tickets** du serveur\nExécuteur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `${footer}` })
                client.channels.cache.get(logs).send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}