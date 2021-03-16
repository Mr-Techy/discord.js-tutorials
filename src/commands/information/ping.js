module.exports = {
	name: "ping",
	description: "Gives the ping of the bot.",
	aliases: ['ping-pong', 'pong'],
	permissions: "SEND_MESSAGES",
	cooldown: 2000,
	run: async (bot, message, args) => {
		const msg = message.channel.send(`Pinging...`);
		msg.edit(`Pong! Reply latency is \`${msg.createdTimestamp - message.createdTimestamp}\` | WebSocket latency is \`${bot.ws.ping}ms\``);

		bot.cooldown.set(`ping_${message.author.id}`);
	}
}
