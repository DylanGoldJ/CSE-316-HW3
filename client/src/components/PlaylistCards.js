import { useContext, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();


    const handleKeyPress = useCallback((event) => {
        if ((event.ctrlKey && event.key === 'z') || (event.ctrlKey && event.key === 'Z') ) {
            if(store.storeTps.hasTransactionToUndo() && (!store.getModalState())) {
                store.undo()
            }
        }

            if((event.ctrlKey && event.key === 'y') || (event.ctrlKey && event.key === 'Y')) {
                if (store.storeTps.hasTransactionToRedo() && (!store.getModalState())) {
                    store.redo()
                }
            }
      }, []);
    
      useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);
    
        // remove the event listener
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleKeyPress]);

    return (
        <div id="playlist-cards">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))
        }
        </div>
    )
}

export default PlaylistCards;