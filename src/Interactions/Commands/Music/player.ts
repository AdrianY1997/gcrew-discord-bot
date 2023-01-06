import { CommandBuilder } from '../../../Structures/Command';

export default new CommandBuilder()
    .setName('player')
    .setNameLocalization('es-ES', 'reproductor')
    .setDescription("Reproduce música")
    .addSubcommand(
        cmd => cmd.setName("play")
            .setNameLocalization("es-ES", 'reproducir')
            .setDescription("reproduce musica")
            .addStringOption(
                cmd => cmd.setName("song")
                    .setNameLocalization("es-ES", "canción")
                    .setDescription("Nombre o url de la cancion")
                    .setRequired(true)
            )

    )
    .addSubcommand(
        cmd => cmd.setName("pause")
            .setNameLocalization("es-ES", "pausar")
            .setDescription("Pausa el reproductor")
    )
    .addSubcommand(
        cmd => cmd.setName("resume")
            .setNameLocalization("es-ES", "continuar")
            .setDescription("Reanuda la musica")
    )
    .addSubcommand(
        cmd => cmd.setName("previous")
            .setNameLocalization("es-ES", "anterior")
            .setDescription("Reproduce la canción anterior")
    )
    .addSubcommand(
        cmd => cmd.setName("next")
            .setNameLocalization("es-ES", "siguiente")
            .setDescription("Reproduce la siguiente canción")
    )
    .addSubcommand(
        cmd => cmd.setName("stop")
            .setNameLocalization("es-ES", "detener")
            .setDescription("Detiene el reproductor")
    )

    .setCallback(async ({ client, interaction }) => {

        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case 'play': {
                const song = interaction.options.getString("song", true)

                if (!interaction.member.voice.channel)
                    return interaction.reply({
                        content: "Primero debes ingresar a un canal de voz"
                    })

                client.distube.play(interaction.member.voice.channel, song, {
                    member: interaction.member,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    textChannel: interaction.channel!,
                });

                interaction.reply({
                    content: "Buscando la canción"
                });

                break;
            }

            case 'pause': {
                client.distube.pause(interaction.guild)

                interaction.reply({
                    content: "Pausando la canción"
                })

                break;
            }

            case 'resume': {
                client.distube.resume(interaction.guild)

                interaction.reply({
                    content: "Reanudando la canción"
                })

                break;
            }

            case 'previous': {
                client.distube.previous(interaction.guild)

                interaction.reply({
                    content: "Reproduciendo canción anterior"
                })

                break;
            }

            case 'next': {
                const queue = client.distube.getQueue(interaction.guild)

                if (queue?.songs.length == 1) {
                    client.distube.stop(interaction.guild)

                    interaction.reply({
                        content: "No hay mas canciones en la lista, deteniendo."
                    })
                } else {
                    client.distube.skip(interaction.guild)

                    interaction.reply({
                        content: "Reproduciendo la siguiente canción"
                    })
                }

                break;
            }

            case 'stop': {
                client.distube.stop(interaction.guild)

                interaction.reply({
                    content: "Deteniendo el reproductor"
                })

                break;
            }

            default: break;
        }


        return setTimeout(() => { interaction.deleteReply() }, 5000);
    })