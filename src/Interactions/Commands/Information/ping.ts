import { CommandBuilder } from '../../../Structures/Command';

export default new CommandBuilder()
    .setName('ping')
    .setNameLocalization('es-ES', 'latencia')
    .setDescription("Muestra la latencia del Bot")
    .addSubcommand(cmd => cmd.setName("ms")
        .setDescription("milisegundos"))
    .setCallback(async ({ client, interaction }) => {
        interaction.reply({
            content: `Pin! ${client.ws.ping}`
        })
    })