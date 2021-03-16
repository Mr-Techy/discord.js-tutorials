const ms = require('ms');

module.exports = (bot, message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(bot.prefix)) return;

	const args = message.content.slice(bot.prefix.length).trim().split(/ +/);
	const cmd = args.shift().toLowerCase();

	const command = bot.commands.get(cmd) || bot.aliases.get(cmd);

	try {
		if (command) {
			if (command.cooldown) {
				if (bot.cooldown.has(`${command.name}_${message.author.id}`)) return message.channel.send(`You must wait \`${ms(bot.cooldown.get(`${command.name}_${message.author.id}`)) - Date.now(), { long: true }}\` before you can use the ${cmd} command again.`);
			}

			if (command.permissions) {
				command.permissions.forEach(permission => {
					if (!message.member.hasPermission(permission.toUpperCase())) return message.channel.send(`You need the \`${permission.toUpperCase()}\` permission to use this command.`);
				});
			};

			command.run(bot, message, args);

			setTimeout(() => {
				bot.cooldown.delete(`${command.name}_${message.author.id}`);
			}, ms(command.cooldown));
		} else return;
	} catch (err) {
		console.error(err);
		message.channel.send(`Something went wrong when executing the ${cmd} command. Error: \`${err}\``);
	};
}
