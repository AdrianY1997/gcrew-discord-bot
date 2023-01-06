import { EventBuilder } from './../../../Structures/Event';

export default new EventBuilder('error')
    .setCallback(() => {
        console.error()
    })