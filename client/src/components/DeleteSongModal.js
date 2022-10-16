import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
//import { useHistory } from 'react-router-dom'
function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);
    //const history = useHistory();
    // let markedName = ""
    // if(store.markDeletePlaylist){
    //     markedName = store.markDeletePlaylist.name
    // }

    function handleDeleteCancelClick(event){
        event.stopPropagation()
        store.deleteSongModalCancel()
    }

    function handleDeleteConfirmClick(event){
        event.stopPropagation()
        store.deleteSongModalConfirm()
    }

    return (
        <div 
            class="modal" 
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
                <div class="modal-root" id='verify-delete-song-root'>
                    <div class="modal-north">
                        Remove Song?
                    </div>
                    <div class="modal-center">
                        <div class="modal-center-content">
                        Are you sure you wish to permanently remove <b></b> from the playlist?
                        </div>
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            class="modal-button" 
                            onClick={handleDeleteConfirmClick}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            class="modal-button" 
                            onClick={handleDeleteCancelClick}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteSongModal;