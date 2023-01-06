import { ExtendedClient } from '../Structures/ExtendedClient';
import { EventBuilder } from './../Structures/Event';
import { join } from 'path';
import { readdirSync } from 'fs';
import { Client } from 'discord.js';

export async function EventHandler(client: ExtendedClient) {
  const categories = readdirSync(join(__dirname, '..', 'Interactions', 'Events'));

  for (const category of categories) {
    const events = readdirSync(join(__dirname, '..', 'Interactions', 'Events', category));

    for (const eventFile of events) {
      const { default: event }: { default: EventBuilder<'ready'> } = await import(
        join(__dirname, '..', 'Interactions', 'Events', category, eventFile)
      );

      if (event.once) {
        client.once(event.name, (...args) => void event.callback(client, ...args));
      } else {
        client.on(event.name, (...args) => void event.callback(client, ...args));
      }
    }
  }
}