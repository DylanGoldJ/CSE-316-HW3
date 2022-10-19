import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteListModal from './DeleteListModal.js'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    let listButtonClass = "playlister-button"
    let activeButtonX = store.listNameActive
        if (activeButtonX) {
            listButtonClass += "-disabled"
        }

    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
            <div id="playlist-selector-heading">

                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className={listButtonClass}
                    disabled={activeButtonX}
                    value="+" />
                    Your Lists
            </div>                {
                    listCard
                }
                <DeleteListModal></DeleteListModal>
            </div>
        </div>
        )
}

export default ListSelector;