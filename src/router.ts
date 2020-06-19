const hasLoad = [];

class GlueRouterEventFactory{
    constructor() {
        throw new Error('can\'t init')
    }
    static createEvent(type, data, options) {
        const event = new CustomEvent(type, {
            detail: {
                ...data
            }
        });
        return event;
    }
}


class GlueRouter {
    static GlueRouterEventFactory = GlueRouterEventFactory;

    static updateRouter(routes, hash){
        let preMatching = false;
        let pickNode = (name, dom) => {
            if (hasLoad.some(_ => _.name === name)){
                return hasLoad.find(_ => _.name === name).node
            }
            return (typeof dom === 'function' ? dom() : dom)
        };
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
                if (hasLoad.some((_) => _.name === name)){
                    pickNode(name, dom).style.display =  'none';
                }
            }
        }
    }

    static createRouter(routes, updateOnStart = true){
        window.document.addEventListener('CHANGE_ROUTE', (event: CustomEvent) => {
            console.log(event);
            const {newHash, oldHash} = event.detail;
            GlueRouter.updateRouter(routes, newHash);
        }, false);
        // updateOnStart && GlueRouter.updateRouter(routes, JToolUrl.portionFromUrl(window.location.href).hashpath)
    }
}

export default GlueRouter;
