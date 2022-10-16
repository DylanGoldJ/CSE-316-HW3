import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
 export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initIndex) {
        super();
        this.model = initModel;
        this.index = initIndex;
    }

    doTransaction() { //Delete the song while also saving the song in the transaction object
        this.song = this.model.deleteSongByIndex(this.index);
    }
    
    undoTransaction() {
        this.model.addSongSpecific(this.song, this.index);
    }
}