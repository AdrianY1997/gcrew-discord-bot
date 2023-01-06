import { EventBuilder } from './../../../Structures/Event';
import { info } from 'console';

export default new EventBuilder('warn')
    .setCallback(info => {
        console.info(info)
    })