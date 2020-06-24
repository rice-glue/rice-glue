class Storage {
    set(key: string, value: string | number | object){
        console.log(key);
    }
}

import {GlueRouter, GlueRouterEventFactory} from './router';

export {
    Storage,
    GlueRouter,
    GlueRouterEventFactory,
}
