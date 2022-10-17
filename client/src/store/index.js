import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
//Transaction Imports:
import AddSong_Transaction from '../transactions/AddSong_Transaction.js';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction.js';
import EditSong_Transaction from '../transactions/EditSong_Transaction.js';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION:"MARK_LIST_FOR_DELETION",//Added cause it was missing?
    MARK_SONG_FOR_DELETION:"MARK_SONG_FOR_DELETION", //Added
    MARK_SONG_FOR_EDIT:"MARK_SONG_FOR_EDIT",//Added
    NEW_SONG_FOR_EDIT:"NEW_SONG_FOR_EDIT"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markDeletePlaylist: null,
        markedDeleteSong: null,
        markedEditSong:null,
        newSongForEdit:null,
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeletePlaylist: store.markDeletePlaylist,
                    markedDeleteSong: store.markedDeleteSong,
                    markedEditSong: store.markedEditSong,
                    newSongForEdit: store.newSongForEdit
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeletePlaylist: store.markDeletePlaylist,
                    markedDeleteSong: store.markedDeleteSong,
                    markedEditSong: store.markedEditSong,
                    newSongForEdit: store.newSongForEdit
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markDeletePlaylist: store.markDeletePlaylist,
                    markedDeleteSong: store.markedDeleteSong,
                    markedEditSong: store.markedEditSong,
                    newSongForEdit: store.newSongForEdit
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeletePlaylist: store.markDeletePlaylist,
                    markedDeleteSong: store.markedDeleteSong,
                    markedEditSong: store.markedEditSong,
                    newSongForEdit: store.newSongForEdit
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeletePlaylist: payload,
                    markedDeleteSong: store.markedDeleteSong,
                    markedEditSong: store.markedEditSong,
                    newSongForEdit: store.newSongForEdit
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeletePlaylist: store.markDeletePlaylist,
                    markedDeleteSong: store.markedDeleteSong,
                    markedEditSong: store.markedEditSong,
                    newSongForEdit: store.newSongForEdit
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markDeletePlaylist: store.markDeletePlaylist,
                    markedDeleteSong: store.markedDeleteSong,
                    markedEditSong: store.markedEditSong,
                    newSongForEdit: store.newSongForEdit
                });
            }
            //For marking a song to be deleted(by index)
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markDeletePlaylist: store.markDeletePlaylist,
                    markedDeleteSong: payload,
                    markedEditSong: store.markedEditSong,
                    newSongForEdit: store.newSongForEdit
                });
            }
            //Marking a song to be editted(by index)
            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markDeletePlaylist: store.markDeletePlaylist,
                    markedDeleteSong: store.markedDeleteSong,
                    markedEditSong: payload,
                    newSongForEdit: store.newSongForEdit
                });
            }

            case GlobalStoreActionType.NEW_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markDeletePlaylist: store.markDeletePlaylist,
                    markedDeleteSong: store.markedDeleteSong,
                    markedEditSong: store.markedEditSong,
                    newSongForEdit: payload,
                });
            }

            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions()
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            //This code may break when we have an empty playlists. try and catch for this
            try{
                const response = await api.getPlaylistPairs();
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: pairsArray
                    });
                }
                else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            catch(e) { //If above does not work(due to empty) try again with an actually empty.
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: []
                });
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
// Our buttons will communite with the store which will do the below aswell
// as trigger api.index.js with api.createSong 
    store.createNewList = function(){
        //Making it async lets us use the await and such properly.
        async function asyncCreateNewPlaylist(){
            //define and create a new playlist with await api.createSong
            let newPlaylist = {name: "Untitled-" + store.newListCounter, songs:[]};
            let response = await api.createPlaylist(newPlaylist);
            
            if (response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: response.data.playlist
                });
                store.history.push("/playlist/"+ response.data.playlist.id);
            }
        }
        asyncCreateNewPlaylist();
    }

    //DELETING:
    // Mark for deletion.
    store.marksDeletePlaylist = function(idNamePair){
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: idNamePair
        })
        store.showDeleteModal()
    }

    store.deleteModalCancel = function(){
        store.hideDeleteModal()
    }
    //DELETING MARKED SONG
    store.deleteModalConfirm = function(){
        let markedId = store.markDeletePlaylist._id
        async function asyncDeleteModalConfirm(id){
            //define and create a new playlist with await api.createSong

            let response = await api.deletePlaylist(id);
            if (response.data.success){
                // storeReducer({
                //     type: GlobalStoreActionType.Cx,
                //     payload: response.data.playlist
                // });
            }
            store.loadIdNamePairs()
        }
        asyncDeleteModalConfirm(markedId);
        store.hideDeleteModal()
    }


    store.showDeleteModal = function() {
        let modal = document.getElementById("delete-list-modal")
        modal.classList.add("is-visible")
    //TODO TOGGLEMODALON - DELETE
    }

    store.hideDeleteModal = function() {
        let modal = document.getElementById("delete-list-modal")
        modal.classList.remove("is-visible")
    //TODO TOGGLEMODALOFF - DELETE
    }

    //ADDING songtransaction.
    store.addAddSongTransaction = function(){
        let transaction = new AddSong_Transaction(store);
        tps.addTransaction(transaction);
    }

    //ADDING SONG, called from transaction
    store.addSongDefault = function(){
        let playlist = store.currentList
        if (playlist) {
            let newSong = {
                title : "Untitled",
                artist : "Unknown",
                youTubeId : "dQw4w9WgXcQ",
                }
            playlist.songs.push(newSong)
            store.changeSongs(playlist._id, playlist.songs)
        }
    }

    store.deleteLastSong = function(){
        let playlist = store.currentList
        if (playlist) {
            playlist.songs.pop()
            store.changeSongs(playlist._id, playlist.songs)
        }
    }

    //DELETING SONG:

    //Marking song for deletion.
    store.markDeleteSong = function(id){

        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: id
        });

        store.showDeleteSongModal() //Show modal when we mark
    }

    store.deleteSongByIndex = function(index){ //This is do, needs index in
        let playlist = store.currentList;
        let deletedSong = playlist.songs[index] //Save song
        playlist.songs.splice(index, 1); //Get rid of song at that index
        
        store.changeSongs(playlist._id, playlist.songs)

        store.hideDeleteSongModal()
        return deletedSong; //Return deleted song
        
    }

    store.addSongSpecific = function(song, index){
        let playlist = store.currentList;        
        playlist.songs.splice(index, 0, song) //put given song to list at the index
        store.changeSongs(playlist._id, playlist.songs)
    }

    store.addDeleteSongTransaction = function(id){
        let transaction = new DeleteSong_Transaction(store, id);
        tps.addTransaction(transaction);
    }

    store.deleteSongModalCancel = function(){
        store.hideDeleteSongModal()
    }

    store.deleteSongModalConfirm = function(){
        store.hideDeleteSongModal()
        store.addDeleteSongTransaction(store.markedDeleteSong)
    }
    
    store.showDeleteSongModal = function() {
        let modal = document.getElementById("delete-song-modal")
        modal.classList.add("is-visible")
    //TODO TOGGLEMODALON - DELETE
    }

    store.hideDeleteSongModal = function() {
        let modal = document.getElementById("delete-song-modal")
        modal.classList.remove("is-visible")
    //TODO TOGGLEMODALOFF - DELETE
    }

    //EDIT
    // Marking for edit
    store.markEditSong = function(id){
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
            payload: id
        });
        // store.showEditSongModal()
        //Show modal when we mark, 
        //moved to SongCard so we can call index on it directly cause of time sync bug with above.
    }

    store.addEditSongTransaction = function (id, newSong){
        let transaction = new EditSong_Transaction(store, id, newSong);
        tps.addTransaction(transaction);
    }

    store.recreateSong = function(index, newSong){
        let playlist = store.currentList
        let prevSong = playlist.songs[index]; //Save original song
        playlist.songs[index] = newSong; //Swap in the new song
        store.changeSongs(playlist._id, playlist.songs)
        return prevSong; //Return original song
    }

    store.EditSongModalCancel = function(){
        store.hideEditSongModal()
    }

    store.EditSongModalConfirm = function(newSong){
        store.hideEditSongModal()
        //Get the song from the elements

        store.addEditSongTransaction(store.markedEditSong,newSong)
    }

    store.showEditSongModal = function(index) {
        let song = store.currentList.songs[index];
        document.getElementById("edit-song-input-artist").value = song.artist;
        document.getElementById("edit-song-input-title").value = song.title;
        document.getElementById("edit-song-input-youtubeid").value = song.youTubeId;

        let modal = document.getElementById("edit-song-modal")
        modal.classList.add("is-visible")
    //TODO TOGGLEMODALON - DELETE
    }

    store.hideEditSongModal = function() {
        let modal = document.getElementById("edit-song-modal")
        modal.classList.remove("is-visible")
    //TODO TOGGLEMODALOFF - DELETE
    }


    //This takes a new song array and changes it in the database.
    store.changeSongs = function (id, songsArr) {
            // GET THE LIST
            async function asyncChangeSongs(id) {
                let response = await api.getPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;
                    playlist.songs = songsArr
                    async function updateList(playlist) {
                        response = await api.updatePlaylistById(playlist._id, playlist);
                        if (response.data.success) {
                            async function getListPairs(playlist) {
                                response = await api.getPlaylistPairs();
                                if (response.data.success) {
                                    let pairsArray = response.data.idNamePairs;
                                    storeReducer({
                                        type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                        payload: {
                                            idNamePairs: pairsArray,
                                            playlist: playlist
                                        }
                                    });
                                }
                            }
                            getListPairs(playlist);
                        }
                    }
                    updateList(playlist);
                }
            }
            asyncChangeSongs(id);
        }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}