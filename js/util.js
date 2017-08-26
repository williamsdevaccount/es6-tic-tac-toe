export default class UTIL{
    static byId(id){
        return window.document.getElementById(id);
    }
    static byClass(cls){
        return window.document.getElementsByClassName(cls);
    }
    static on(el,event,cb){
        el.addEventListener(event,cb);
    }
    static off(el,event,cb){
        el.removeEventListener(event,cb);
    }
}
