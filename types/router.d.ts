export interface GlueRouterEventFactory {
    newHash: string;
    oldHash: string;
}

export declare class GlueRouter{
    static GlueRouterEventFactory: GlueRouterEventFactory;
    static updateRouter(routes, hash);
    static createRouter(routes, updateOnStart: boolean);
}