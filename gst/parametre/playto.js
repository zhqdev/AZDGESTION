const Discord = require("discord.js");
const db = require('quick.db');
const config = require("../config");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  name: 'playto',
  usage: 'playto <statut>',
  description: `Permet de changer le statut du bot par "Joue à".`,
  async execute(client, message, args) {

    if (config.bot.buyer.includes(message.author.id)) {

      if (!message.guild) return;

      if (args.length) {
        let str_content = args.join(" ");
        client.user.setPresence({
          activities: [{
            name: `${str_content}`,
            type: "PLAYING",
            url: "https://discord.gg/A5bfyv3AzB"
          }],
          status: "online"
        });
      }
    }
  }
};
