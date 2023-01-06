// @collapse

import { EmbedBuilder } from "@discordjs/builders"
import { Colors } from "discord.js"
import { configVariablesTypes } from "types";
import { loc } from './locales';

const color = Colors.DarkVividPink;

export const configMessageEmbed = async (config: configVariablesTypes) => {

    const lang = config.lang;

    return new EmbedBuilder()
        .setColor(color)
        .setTitle(await loc.__("config.embed.title", lang))
        .setDescription(await loc.__("config.embed.description", lang, {
            name: "Greñas Crew Bot"
        }))
        .addFields([
            {
                name: await loc.__("config.adminCommandsField.name", lang,),
                value: "values"
            },
            {
                name: await loc.__("config.adminConfigMessage.name", lang),
                value: await loc.__("config.adminConfigMessage.value", lang)
            }
        ])
        .setFooter({
            text: await loc.__("common.fields.text", lang)
        })
        .setTimestamp();
}

export const configMessageVariables = async (config: configVariablesTypes) => {
    return JSON.stringify(config, null, 4);
}
