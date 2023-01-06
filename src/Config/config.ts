import { GatewayIntentBits, Guild, TextChannel } from 'discord.js';
import sc from '../config.json'
import { YtDlpPlugin } from "@distube/yt-dlp";
import { default as SpotifyPlugin } from "@distube/spotify";
import { configVariablesTypes } from '../../types';
import { configMessageVariables } from '../Utils/embeds';

const token = sc ? sc.token : process.env.token ?? '';
const test_token = sc ? sc.test_token : process.env.test_token ?? '';
const spotify_client_id = sc ? sc.spotify_client_id : process.env.spotify_client_id ?? '';
const spotify_client_secret = sc ? sc.spotify_client_secret : process.env.spotify_client_secret ?? '';

export const config = {
    secrets: {
        token: token,
        test_token: test_token,
    },
    client: {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.GuildVoiceStates
        ],
    },
    distube: {
        emitNewSongOnly: false,
        searchCooldown: 10,
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        plugins: [
            new YtDlpPlugin(),
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: false,
                api: {
                    clientId: spotify_client_id,
                    clientSecret: spotify_client_secret
                }
            })

        ],
    }
}

export const setConfig = async (guild: Guild, config: configVariablesTypes) => {

    const configChannel = await guild.channels.fetch(config.configChannel.id)

    const configMessage = await (configChannel as TextChannel).messages.fetch(config.configChannel.message.id);

    return await configMessage.edit(await configMessageVariables(config));
}