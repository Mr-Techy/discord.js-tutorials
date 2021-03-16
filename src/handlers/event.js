const { readdirSync } = require('fs');

module.exports = (bot) => {
	readdirSync(`../events/`).forEach(dir => {
		const eventFiles = readdirSync(`../events/${dir}/`);
		for (const file of eventFiles) {
			const event = require(`../events/${dir}/${file}`);
			const eName = dir.toString();

			bot.on(eName, event.bind(bot, null));
		};
	});
};
