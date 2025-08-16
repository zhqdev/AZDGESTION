const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config")
const owner = new db.table("Owner")
const boostlog = new db.table("boostlog")
const embedlog = new db.table("embedlog")
const msglog = new db.table("msglog")
const raidlog = new db.table("raidlog")
const modlog = new db.table("modlog")
const ticketlog = new db.table("ticketlog")
const giveawaylog = new db.table("giveawaylog")
const cl = new db.table("Color")
const footer = config.bot.footer
 


module.exports = {
    name: 'presetlogs',
    usage: 'presetlogs',
    description: `Permet de créer automatiquement la catégorie des logs.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            message.channel.send(`ℹ️ Création de la **catégorie des logs** en cours...`).then(msge => {
                message.guild.channels.create('LOGS', {
                    type: 'GUILD_CATEGORY',
                    permissionsOverwrites: [{
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                    }]
                }).then(c => {
                    c.guild.channels.create(`📁・logs-message`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        msglog.set(`${message.guild.id}.messagelog`, logs.id)
                    })
                    //logs raid
                    c.guild.channels.create(`📁・logs-raid`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        raidlog.set(`${message.guild.id}.raidlog`, logs.id)
                    })
                    //modlog
                    c.guild.channels.create(`📁・logs-mod`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        modlog.set(`${message.guild.id}.modlog`, logs.id)
                    })
                    //boostlog
                    c.guild.channels.create(`📁・logs-boost`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        boostlog.set(`${message.guild.id}.boostlog`, logs.id)
                    })
                    //ticketlog
                    c.guild.channels.create(`📁・logs-ticket`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        ticketlog.set(`${message.guild.id}.ticketlog`, logs.id)
                    })

                    //giveawaylog
                    c.guild.channels.create(`📁・logs-giveaways`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        giveawaylog.set(`${message.guild.id}.giveawaylog`, logs.id)
                    })

                    msge.edit(`ℹ️ Création de la **catégorie des logs** effectuée avec succès.`)

                }
                )
            }
            )
        }
    }
}