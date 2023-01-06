import { ClientEvents } from 'discord.js';
import { ExtendedClient } from './ExtendedClient';

export class MessageBuilder<T extends keyof ClientEvents>{
    public constructor(public name: T, public once?: true) { }

    public callback!: EventFunction<T>;

    public setCallback(fn: EventFunction<T>) {
        this.callback = fn;
        return this;
    }
}

type EventFunction<T extends keyof ClientEvents> = (
    client: ExtendedClient,
    ...args: ClientEvents[T]
) => unknown;