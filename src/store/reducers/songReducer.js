import * as actionTypes from '../actions/actionTypes';

const defaultState = {
    allSongs: null,
    nowPlaying: null,
    playlist: null
}

const songRecuder = (state = defaultState, action) => {
    let newState;
    let likedUsers;
    switch (action.type) {
        case actionTypes.GET_ALL_SONGS:
            return {
                ...state,
                allSongs: action.payload
            };
        case actionTypes.LIKE_SONG:
            newState = { ...state };
            likedUsers = newState.allSongs[action.payload.songKey].likedUsers =
                newState.allSongs[action.payload.songKey].likedUsers ?
                    newState.allSongs[action.payload.songKey].likedUsers :
                    [];
            likedUsers.push(action.payload.userUid);
            newState.allSongs[action.payload.songKey].likedUsers = likedUsers;
            return newState;
        case actionTypes.UNLIKE_SONG:
            newState = { ...state };
            likedUsers = newState.allSongs[action.payload.songKey].likedUsers =
                newState.allSongs[action.payload.songKey].likedUsers ?
                    newState.allSongs[action.payload.songKey].likedUsers :
                    [];
            likedUsers.splice(likedUsers.indexOf(action.payload.userUid), 1);
            return newState;
        case actionTypes.SELECT_NOW_PLAYING:
            newState = { ...state };
            newState.nowPlaying = {
                ...newState.allSongs[action.payload.songKey],
                key: action.payload.songKey
            };
            newState.playlist = defaultState.playlist;
            return newState;
        case actionTypes.PLAY_PLAYLIST:
            newState = {
                ...state,
                playlist: action.payload.playlist
            };
            return newState;
        case actionTypes.STOP_PLAYING:
            newState = {
                ...state,
                nowPlaying: null,
                playlist: null
            };
            return newState;
        default: return state;
    }
}

export default songRecuder;