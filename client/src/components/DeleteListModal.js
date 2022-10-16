import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
//import { useHistory } from 'react-router-dom'
function DeleteListModal() {
    const { store } = useContext(GlobalStoreContext);
    //const history = useHistory();
    let markedName = ""
    if(store.markDeletePlaylist){
        markedName = store.markDeletePlaylist.name
    }

    function handleDeleteCancelClick(event){
        event.stopPropagation()
        store.deleteModalCancel()
    }

    function handleDeleteConfirmClick(event){
        event.stopPropagation()
        store.deleteModalConfirm()
    }

    return (
        <div 
            class="modal" 
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
                <div class="modal-root" id='verify-delete-list-root'>
                    <div class="modal-north">
                        Delete playlist?
                    </div>
                    <div class="modal-center">
                        <div class="modal-center-content">
                            Are you sure you wish to permanently delete {markedName} the playlist?
                        </div>
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            class="modal-button" 
                            onClick={handleDeleteConfirmClick}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            class="modal-button" 
                            onClick={handleDeleteCancelClick}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteListModal;