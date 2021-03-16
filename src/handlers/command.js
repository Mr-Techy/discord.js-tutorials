const { readdirSync } = require('fs');

module.exports = (bot) => {
	readdirSync(`../commands/`).forEach(dir => {
		const commandFiles = readdirSync(`../commands/${dir}/`);
		for (const file of commandFiles) {
			const command = require(`../commands/${dir}/${file}`);
			
			bot.commands.set(command.name, command);
			if (command.aliases) {
				bot.aliases.forEach(alias => {
					bot.aliases.set(alias, command);
				});
			};
		};
	});
};