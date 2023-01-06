import { MusicBuilder } from './../Structures/Music';
import { ExtendedClient } from '../Structures/ExtendedClient';
import { join } from 'path';
import { readdirSync } from 'fs';

export async function MusicHandler(client: ExtendedClient) {
    const categories = readdirSync(join(__dirname, '..', 'Interactions', 'Music'));

    for (const category of categories) {
        const events = readdirSync(join(__dirname, '..', 'Interactions', 'Music', category));

        for (const eventFile of events) {
            const { default: event }: { default: MusicBuilder<'playSong'> } = await import(
                join(__dirname, '..', 'Interactions', 'Music', category, eventFile)
            );

            if (event.once) {
                client.distube.once(event.name, (...args) => void event.callback(...args));
            } else {
                client.distube.on(event.name, (...args) => void event.callback(...args));
            }
        }
    }
}