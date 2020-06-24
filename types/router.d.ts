export declare class GlueRouterEventFactory {
    // newHash: string;
    // oldHash: string;
    public static createEvent(type: string, data, options?);
}

export declare class GlueRouter{
    static updateRouter(routes, hash);
    static createRouter(routes, updateOnStart: boolean);
}