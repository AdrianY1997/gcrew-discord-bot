import { ClientUser, Guild } from "discord.js";

export interface GCrewConfig {
    secrets: GCrewSecrets
    client: GCrewClient
    distube: any
}

export interface GCrewSecrets {
    token: string
    test_token: string
}

export interface GCrewClient<Boolean> {
    [x: string]: any;
    once(arg0: string, arg1: () => void): unknown;
    application: any;
    user: ClientUser;
    // intents: GatewayIntentBits
}

export interface GCrewTokens {
    token: string
    test_token: string
}

export interface configVariablesTypes {
    lang: string
    configChannel: configVariableTypesConfigChannel
}

export interface configVariableTypesConfigChannel {
    id: string
    message: configVariableTypesMessage
}

export interface configVariableTypesMessage {
    id: string
}

export interface GuildConfig implements Guild {
    bot: GuildConfigBot
}

export interface GuildConfigBot {
    gcrew: GuildConfigBotGcrew
}

export interface GuildConfigBotGcrew {
    config: object
}

interface GuildS extends Guild {
    bot: object | any
    channels: GuildChannelManager
}

interface 