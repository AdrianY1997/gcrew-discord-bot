import { EventBuilder } from './../../../Structures/Event';
import { ActivityType, BaseInteraction, ChatInputCommandInteraction } from 'discord.js';
import player from 'src/Interactions/Commands/Music/player';

export default new EventBuilder('messageCreate')
    .setCallback(async (client, message) => {

    })