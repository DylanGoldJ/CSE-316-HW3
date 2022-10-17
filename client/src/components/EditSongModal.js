import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
//import { useHistory } from 'react-router-dom'
function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    //const history = useHistory();
    let markedName = ""
    if(store.markedDeleteSong != null){
        if(store.currentList){
            if(store.currentList.songs[store.markedDeleteSong]){
                markedName = store.currentList.songs[store.markedDeleteSong].title
            }
        }
    }

    function handleDeleteCancelClick(event){
        event.stopPropagation()
        store.EditSongModalCancel()
    }

    function handleDeleteConfirmClick(event){
        let inputSong = {
            artist: document.getElementById("edit-song-input-artist").value,
            title: document.getElementById("edit-song-input-title").value,
            youTubeId: document.getElementById("edit-song-input-youtubeid").value
        }
        event.stopPropagation()
        store.EditSongModalConfirm(inputSong)
    }

    return (
        <div
            class="modal"
            id="edit-song-modal"
            data-animation="slideInOutLeft">
            <div class="modal-root" id='verify-edit-song-root'>
                <div class="modal-north">
                    Edit Song
                </div>
                <div class="modal-center">
                    <span>Title:</span>
                    <input
                        type="text"
                        id="edit-song-input-title"
                        
                        class="modal-textfield"
                    />

                    <span> Artist:</span>
                    <input
                        type="text" id="edit-song-input-artist"
                        
                        class="modal-textfield"
                    />

                    <span>YoutubeId:</span>
                    <input
                        type="text" id="edit-song-input-youtubeid"
                        
                        class="modal-textfield"
                    />

                </div>
                <div class="modal-south">
                    <input type="button"
                        id="edit-song-confirm-button"
                        class="modal-button"
                        onClick={handleDeleteConfirmClick}
                        value='Confirm' />
                    <input type="button"
                        id="edit-song-cancel-button"
                        class="modal-button"
                        onClick={handleDeleteCancelClick}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default EditSongModal;