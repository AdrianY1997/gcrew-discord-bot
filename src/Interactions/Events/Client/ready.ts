import { EventBuilder } from './../../../Structures/Event';
import { ActivityType } from 'discord.js';
import { init } from '../../../Utils/initGuilds';

export default new EventBuilder('ready', true)
    .setCallback(async client => {
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    name: "/help",
                    type: ActivityType.Listening,
                }
            ],
            afk: false
        });

        console.log(`${client.user.username} `)

        client.guilds.cache.forEach(guild => init(guild));
    })