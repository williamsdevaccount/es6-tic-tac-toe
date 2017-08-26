import View from './view';
import Util from './util';
export default class Controller{
    constructor(){
     this.view = new View();
     this.onGameRowClick = this.onGameRowClick.bind(this);
     this.onRestartClick = this.onRestartClick.bind(this);
     this.onPlayAgainClick = this.onPlayAgainClick.bind(this);
     this.onNoPlayClick = this.onNoPlayClick.bind(this);
     Util.on(this.view.dialogYes,'click',this.onPlayAgainClick);
     Util.on(this.view.dialogNo,'click',this.onNoPlayClick);
     this.plays = 0;
    }
    onGameRowClick(e){
        this.plays++;
        this.view.setRowState(e.currentTarget.getAttribute('data-position')-1,this.player);
        Util.off(e.currentTarget,'click',this.onGameRowClick);
        if (this.plays === 9){
            this.endGame();
        }
    }
    endGame(){
        this.view.setDialogState(true);
    }
    onPlayAgainClick(){
        this.plays = 0;
        Util.off(this.view.restart,'click',this.onRestartClick);
        this.init();
        this.view.setDialogState(false);
    }
    onNoPlayClick(){
        this.view.setDialogState(false);
    }

    get player(){
        if  (this.plays % 2 > 0){
            return 'X';
        }
        return 'O';
    }
    init(){
        Util.on(this.view.restart,'click',this.onRestartClick);
        this.view.rows.forEach((row)=>{
            row.innerHTML = '';
            console.log(row);
           Util.on(row,'click',this.onGameRowClick);
        });
    }
    onRestartClick(e){
        this.plays = 0;
        Util.off(this.view.restart,'click',this.onRestartClick);
        this.init();
    }
}