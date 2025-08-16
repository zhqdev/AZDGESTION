const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const config = require("../config")
const footer = config.bot.footer

module.exports = {
    name: 'unbl',
    usage: 'unbl',
    description: `Permet d'enlever quelqu'un de la liste noire du bot`,
    async execute(client, message, args) {

        if (config.bot.buyer.includes(message.author.id)) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            if (args[0]) {
                let member = message.mentions.users.first() || client.users.cache.get(args[0]);
                if (!member) try{
                    member = await client.users.fetch(args[0])
                }
                catch(e){
                    return message.channel.send(`Aucun utilisateur trouvé pour \`${args[0] || "rien"}\``)
                }            
                if (db.get(`blacklist.${member.id}`) === null) { return message.channel.send(`${member.username} n'est pas dans la liste noire`) }
                db.set(`${config.bot.blacklist}.blacklist`, db.get(`${config.bot.blacklist}.blacklist`).filter(s => s !== member.id))
                db.delete(`blacklist.${member.id}`, member.id)

                message.channel.send(`**__${member.username}__** n'est plus dans la liste noire`)

            } else if (!args[0]) {
                return
            }
        } else { }
    }
}