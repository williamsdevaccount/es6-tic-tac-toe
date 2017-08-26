import Controller from './controller';

class App{
    constructor(){
        this.onLoad = this.onLoad.bind(this);
        this.controller = null;
    }
    onLoad(){
        this.controller = new Controller();
        this.controller.init();
    }
}
const app = new App();
window.onload = ()=> {
    app.onLoad();
};