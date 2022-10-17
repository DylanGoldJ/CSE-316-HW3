import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that edits songs in a playlist
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initIndex, initsong) {
        super();
        this.model = initModel;
        this.index = initIndex;
        this.song  = initsong; 
    }

    doTransaction() { 
        this.previousSong = this.model.recreateSong(this.index, this.song)
    }
    
    undoTransaction() {
        this.model.recreateSong(this.index, this.previousSong)
    }
}