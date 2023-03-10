import { EventBuilder } from './../../../Structures/Event';
import { ChannelType, ChatInputCommandInteraction, CommandInteraction } from 'discord.js';


export default new EventBuilder('interactionCreate')
    .setCallback(async (client, interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.channel && interaction.channel.type == ChannelType.DM) {
            return interaction.reply({
                content: 'No puedes usar comandos en MD',
                ephemeral: true
            })
        }

        if (!interaction.inCachedGuild()) {
            await interaction.guild?.fetch();
            return interaction.reply({
                content: "Guardando el servidor en cache",
                ephemeral: true
            })
        }

        const { commandName } = interaction;

        const command = client.commands.get(commandName);

        if (!command) {
            return interaction.reply({
                content: 'No se encontrĂ³ el comando',
                ephemeral: true
            })
        }

        await command.callback({ client, interaction });
        return void 0;
    })