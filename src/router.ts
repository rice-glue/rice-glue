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


// const uuid = StringTool.uuid();
// let hasRenderFinish = false;
// (function createLoading(){
//     const divEle = document.createElement('div');
//     const loadingImg = document.createElement('img');
//     loadingImg.src = loading;
//     divEle.setAttribute('id', uuid);
//     divEle.appendChild(loadingImg);
//     divEle.style.cssText = rotateKeyFrames;
//     loadingImg.style.setProperty('width', '40px');
//     loadingImg.style.setProperty('height', '40px');
//     loadingImg.style.setProperty('animation', 'riceglue_loading_rotate 1s linear infinite');
//     loadingImg.style.setProperty('transform-origin', 'center center');
//     const animName = 'riceglue_loading_rotate';
//     const rotateKeyFrames =`@keyframes ${animName} { 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } }`;
//     const style = document.createElement('style');
//     style.innerHTML = rotateKeyFrames;
//     divEle.appendChild(style);
//     if (!hasRenderFinish){
//         damaiDOM.appendChild(divEle);
//     }
// })();

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
                if (typeof dom === 'object'){
                    const node = pickNode(name, dom);
                    hasLoad.push({ name, node });
                    node.style.display = 'none';
                } else {
                    if (hasLoad.some((_) => _.name === name)) {
                        pickNode(name, dom).style.display = 'none';
                    }
                }
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
