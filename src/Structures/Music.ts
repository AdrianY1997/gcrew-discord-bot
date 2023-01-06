import { DisTubeEvents, Queue } from 'distube';

export class MusicBuilder<T extends keyof DisTubeEvents>{
    public constructor(public name: T, public once?: true) { }

    public callback!: EventFunction<T>;

    public setCallback(fn: EventFunction<T>) {
        this.callback = fn;
        return this;
    }
}

type EventFunction<T extends keyof DisTubeEvents> = (
    ...args: DisTubeEvents[T]
) => unknown;