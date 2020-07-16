export declare class GlueRouterEventFactory {
    public static createEvent(type: string, data, options?);
}

export declare class GlueRouter{
    static createRouter(routes, updateOnStart: boolean): GlueRouter;
    public dispatchRouteChangeEvent(from: RiceGlueRoute, to: RiceGlueRoute): void;
}

export declare interface RiceGlueRoute {
    path: string;
}


export declare namespace RiceGlueEvent{
    export const RouteChangeEvent: string;
}

export declare namespace RiceGlueEventType{
    export const ROUTE_CHANGE: string;
}