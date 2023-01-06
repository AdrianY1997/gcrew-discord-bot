import { CommandBuilder } from '../../../Structures/Command';

export default new CommandBuilder()
    .setName("admin")
    .setDescription("Comandos de administración")
    .addSubcommand(
        cmd => cmd.setName("set")
            .setNameLocalization("es-ES", "asignar")
            .setDescription("Asignación de datos")
            .addStringOption(
                cmd => cmd.setName("target")
                    .setNameLocalization("es-ES", "objetivo")
                    .setDescription("Objetivo para asignar")
                    .addChoices(
                        {
                            name: "Music Channel",
                            value: "music"
                        },
                        {
                            name: "Auto Role",
                            value: "autorole"
                        }
                    )
                    .setRequired(true)
            )
            .addStringOption(
                cmd => cmd.setName("name")
                    .setNameLocalization("es-ES", "nombre")
                    .setDescription("Nombre del canal")
                    .setRequired(true)
            )
    ).setCallback(async ({ client, interaction }) => {
        const subcommand = interaction.options.getSubcommand();
        const target = interaction.options.getString("target")
        const name = interaction.options.getString("name");

        interaction.reply({ content: subcommand + target + name })

        setTimeout(() => {
            interaction.deleteReply();
        }, 5000);
    })