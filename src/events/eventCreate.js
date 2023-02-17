module.exports = {
    name: "eventCreate",
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const {commands} = client;
            const {commandName} = interaction;
            const command = commands.get(commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(`Error: ${error}`);
                await interaction.reply({
                    content:
                    "Something went wrong while executing this command!",
                    ephemeral: true,
                });
            }
        }
    },
};
