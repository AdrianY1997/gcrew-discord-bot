import { ExtendedDistube } from './ExtendedDistube';
import { CommandBuilder } from './Command';
import { GCrewConfig, GCrewTokens } from '../../types';
import { Client, Collection } from 'discord.js';
import { EventHandler } from '../Handlers/Events';
import { CommandHandler } from '../Handlers/Commands';
import { MusicHandler } from '../Handlers/Music';

export class ExtendedClient extends Client<true> {
    public distube;

    public commands = new Collection<string, CommandBuilder>();

    constructor(config: GCrewConfig) {
        super({ intents: 131071 })

        this.distube = new ExtendedDistube(this, config)

        this.start(config.secrets)
    }

    public async start(tokens: GCrewTokens) {

        await CommandHandler(this);
        await EventHandler(this);
        await MusicHandler(this);

        this.login(tokens.token);
    }
}