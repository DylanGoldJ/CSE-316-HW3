import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

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