import { GCrewConfig } from 'types';
import { ExtendedClient } from './ExtendedClient';
import { DisTube } from 'distube';

export class ExtendedDistube extends DisTube {
    constructor(client: ExtendedClient, config: GCrewConfig) {
        super(client, config.distube);
    }
}