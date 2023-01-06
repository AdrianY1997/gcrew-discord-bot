import { ExtendedClient } from './Structures/ExtendedClient';

import { config } from './Config/config';

import dotenv from 'dotenv';

dotenv.config();

new ExtendedClient(config)

