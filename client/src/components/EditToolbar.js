import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";//Original
    
    let addSongClass = "playlister-button";
    let undoClass = "playlister-button";
    let redoClass = "playlister-button";
    let closeClass = "playlister-button";

    let canAddSong = ((store.currentList === null) && (!store.modalActive));
    if (canAddSong) addSongClass += "-disabled";


    let canUndo = !(store.storeTps.hasTransactionToUndo())
    if (canUndo) undoClass += "-disabled";

    let canRedo = !(store.storeTps.hasTransactionToRedo())
    if (canRedo) redoClass += "-disabled";

    
    let canClose= (store.currentList === null)
    if (canClose) closeClass += "-disabled";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    // let editStatus = false;
    // if (store.isListNameEditActive) {
    //     editStatus = true;
    // }


    
    //Handle add Song.
    function handleAdd() {
        store.addAddSongTransaction()
    }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={canAddSong}
                value="+"
                className={addSongClass}
                onClick={handleAdd}
            />
            <input
                type="button"
                id='undo-button'
                disabled={canUndo}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={canRedo}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={canClose}
                value="&#x2715;"
                className={closeClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;