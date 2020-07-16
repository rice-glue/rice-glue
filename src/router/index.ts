import UrlTool from "../tool/UrlTool";
import {RiceGlueRoute} from "../../types";

type Route = {
    path: string
}
const cacheRoute = [];
namespace RiceGlueEventType{
    export const ROUTE_CHANGE: string = 'ROUTE_CHANGE';
}

class GlueRouterEventFactory{
    constructor() {
        throw new Error('can\'t init')
    }
    static createEvent(type, data, options?) {
        return new CustomEvent(type, {
            detail: {
                ...data
            }
        });
    }
}

const pickNode = (name, dom) => {
    try {
        const node = cacheRoute.find(_ => _.name === name)?.node;
        if (node){
            return node;
        }
        return (typeof dom === 'function' ? dom() : dom)
    }catch (e) {
        console.log(e)
        return null
    }

};


class GlueRouter {
    static ROUTER_ID = 0;
    private id: number = null;
    constructor(routes, updateOnStart = true) {
        this.id = GlueRouter.ROUTER_ID++;
        window.document.addEventListener(RiceGlueEventType.ROUTE_CHANGE, (event: CustomEvent) => {
            event.stopPropagation();
            const {to, from} = event.detail;
            this.adjustRouter(routes, to, from);
        }, false);
        updateOnStart && this.adjustRouter(routes);
    }

    private adjustRouter(routes, to?: Route, from?: Route){
        if (arguments.length === 1){
            to = {
                path: UrlTool.portionFromUrl(window.location.href).hashpath
            }
        }
        let preMatching = false;
        for (let route of routes){
            const {dom, hashRegex, name} = route;
            const hasMatching = (hashRegex as RegExp).test(to.path);
            if (!preMatching && hasMatching){
                preMatching = true;
                const node = pickNode(name, dom);
                node.style.display = '';
                if (!cacheRoute.some((_) => _.name === name)){
                    cacheRoute.push({ name, node })
                }
            } else {
                if (typeof dom === 'object'){
                    // the route component had init
                    const node = pickNode(name, dom);
                    cacheRoute.push({ name, node });
                    node.style.display = 'none';
                } else if (typeof dom === 'function'){
                    // the route component is not init by function
                    if (cacheRoute.some((_) => _.name === name)) {
                        pickNode(name, dom).style.display = 'none';
                    }
                }
            }
        }
        window.dispatchEvent(new Event('CHANGE_ROUTE'))
    }


    public dispatchRouteChangeEvent(from: RiceGlueRoute, to: RiceGlueRoute){
        dispatchRouteEvent(RiceGlueEventType.ROUTE_CHANGE, {
            routerId: this.id,
            from,
            to
        })
    }

    static createRouter(routes, updateOnStart = true){
        const glueRouter = new GlueRouter(routes, updateOnStart);
        return glueRouter;
    }
}

const dispatchRouteEvent = (type: string, data: any) => {
    window.document.dispatchEvent(GlueRouterEventFactory.createEvent(type, {
        ...data
    }));
};

export {
    GlueRouter,
    GlueRouterEventFactory,
    RiceGlueEventType,
};
