import { ExtendedClient } from './../Structures/ExtendedClient';
import { CommandBuilder } from './../Structures/Command';
import { join } from 'path';
import { readdirSync } from 'fs';

export async function CommandHandler(client: ExtendedClient) {
    const categories = readdirSync(join(__dirname, '..', 'Interactions', 'Commands'));

    for (const category of categories) {
        const commands = readdirSync(join(__dirname, '..', 'Interactions', 'Commands', category));

        for (const commandFile of commands) {
            const { default: cmd }: { default: CommandBuilder } = await import(
                join(__dirname, '..', 'Interactions', 'Commands', category, commandFile)
            );

            client.commands.set(cmd.name, cmd);
        }
    }

    client.once('ready', () => {
        client.application.commands.set(client.commands.map((cmd: { toJSON: () => any; }) => cmd.toJSON()));
    })
}