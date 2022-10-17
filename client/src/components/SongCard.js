import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);


    function handleDragStart(event) {
        event.dataTransfer.setData("song", event.target.id);
        store.setMoves(true, store.draggedTo)
    }

    function handleDragOver (event) {
        event.preventDefault();
        store.setMoves(store.isDragging, true)
    }
    
    function handleDragEnter (event) {
        event.preventDefault();
        store.setMoves(store.isDragging, true)
    }
    function handleDragLeave (event) {
        event.preventDefault();
        store.setMoves(store.isDragging, false)
    }
    function handleDrop (event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1,target.id.indexOf("-") + 2 );
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1, target.id.indexOf("-") + 2);
        store.setMoves(false, false)

        // ASK THE MODEL TO MOVE THE DATA
        store.addMoveSongTransaction(sourceId, targetId);
    }

    function handleDeleteClick(event){
        event.stopPropagation()
        store.markDeleteSong(index)
    }
    function handleDoubleClick(event){
        event.stopPropagation()
        store.markEditSong(index)
        store.showEditSongModal(index) //Show modal when we mark
    }

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick={handleDoubleClick}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable = "true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick = {handleDeleteClick}
            />
        </div>
    );
}

export default SongCard;