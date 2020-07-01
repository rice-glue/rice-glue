import {JToolUrl} from 'icemilk';

const hasLoad = [];

class GlueRouterEventFactory{
    constructor() {
        throw new Error('can\'t init')
    }
    static createEvent(type, data, options?) {
        const event = new CustomEvent(type, {
            detail: {
                ...data
            }
        });
        return event;
    }
}


const pickNode = (name, dom) => {
    const node = hasLoad.find(_ => _.name === name)?.node;
    if (node){
        return node;
    }
    return (typeof dom === 'function' ? dom() : dom)
};

class GlueRouter {
    static updateRouter(routes, hash){
        let preMatching = false;
        for (let route of routes){
            const {dom, hashRegex, name} = route;
            const hasMatching = (hashRegex as RegExp).test(hash);
            if (!preMatching && hasMatching){
                preMatching = true;
                const node = pickNode(name, dom);
                node.style.display = 'block';
                if (!hasLoad.some((_) => _.name === name)){
                    hasLoad.push({ name, node })
                }
            } else {
                pickNode(name, dom).style.display =  'none';
            }
        }
        window.dispatchEvent(new Event('CHANGE_ROUTE'))
    }

    static createRouter(routes, updateOnStart = true){
        console.log('create router is running')
        window.document.addEventListener('CHANGE_ROUTE', (event: CustomEvent) => {
            event.stopPropagation();
            console.log('CHANGE_ROUTE is running')
            console.log(event);
            const {newHash, oldHash} = event.detail;
            GlueRouter.updateRouter(routes, newHash);
        }, false);
        console.log(JToolUrl.portionFromUrl(window.location.href).hashpath)
        updateOnStart && GlueRouter.updateRouter(routes, JToolUrl.portionFromUrl(window.location.href).hashpath)
    }
}

export {
    GlueRouter,
    GlueRouterEventFactory,
};
