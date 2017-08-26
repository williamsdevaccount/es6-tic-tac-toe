import Util from './util';
class GameView{
    constructor(id = 'board'){
        this.element = Util.byId(id);
        this._rows = this.element.getElementsByTagName('td');
        this.rows = this.formatRows();
        this.restart = Util.byId('btnRestart');
        this.dialog = Util.byId('gameModal');
        this.dialogYes = Util.byId('btnDialogYes');
        this.dialogNo = Util.byId('btnDialogNo');
    }
    setRowState(i,text){
        this.rows[i].innerHTML = text;
    }
    setDialogState(open){
        this.dialog.style.display = open ? 'block' : 'none';
    }
     formatRows(){
        let ar = [];
        for(let i =0; i < this._rows.length;i++){
            ar[i] = this._rows.item(i);
        }
        return ar;
    }
}
export default GameView;