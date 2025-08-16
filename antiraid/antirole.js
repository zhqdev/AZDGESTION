const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const cl = new db.table("Color")
const atr = new db.table("antirolecreate")
const ard = new db.table("antiroledelete")
const aru = new db.table("antiroleupdate")

module.exports = {
    name: 'antirôle',
    usage: 'antirôle',
    description: `Permet de configurer l'antirôle.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            if (args[0] == 'on') {

                atr.set(`config.${message.guild.id}.antirolecreate`, true)
                ard.set(`config.${message.guild.id}.antiroledelete`, true)
                ard.set(`config.${message.guild.id}.antiroledelete`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'antirôle** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            }

            if (args[0] == 'off') {

                atr.set(`config.${message.guild.id}.antirolecreate`, false)
                ard.set(`config.${message.guild.id}.antiroledelete`, false)
                ard.set(`config.${message.guild.id}.antiroledelete`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'antirôle** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            }

            if (args[0] == 'create') {

                if (args[1] == 'on') {

                    atr.set(`config.${message.guild.id}.antirolecreate`, true)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirôle create** est maintenant **activé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else if (args[1] == 'off') {

                    atr.set(`config.${message.guild.id}.antirolecreate`, false)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirôle create** est maintenant **désactivé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

            } else if (args[0] == 'delete') {

                if (args[1] == 'on') {

                    ard.set(`config.${message.guild.id}.antiroledelete`, true)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirôle Delete** est maintenant **activé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else if (args[1] == 'off') {

                    ard.set(`config.${message.guild.id}.antiroledelete`, false)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirôle Delete** est maintenant **désactivé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }
            } else if (args[0] == 'update') {

                if (args[1] == 'on') {

                    aru.set(`config.${message.guild.id}.antiroleupdate`, true)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirôle Update** est maintenant **activé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else if (args[1] == 'off') {

                    aru.set(`config.${message.guild.id}.antiroleupdate`, false)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirôle Update** est maintenant **désactivé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else {
                    return message.reply(`Paramètre invalide.`)
                }
            }
        }
    }
}
