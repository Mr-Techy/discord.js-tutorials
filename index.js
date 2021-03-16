const { Client, Collection } = require('discord.js');
const bot = new Client();
const { token } = require('./config.json');

bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldown = new Collection();
["command", "event"].forEach(handler => {
	require(`./src/handlers/${handler}`);
});

bot.login(token);