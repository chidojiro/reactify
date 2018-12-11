import * as actionTypes from '../actions/actionTypes';

const authReducer = (state = null, action) => {
    let newState;
    let playlist;
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return action.payload;
        case actionTypes.SIGN_OUT:
            return null;
        case actionTypes.GET_USER:
            return action.payload;
        case actionTypes.ADD_TO_PLAYLIST:
            newState = { ...state };
            playlist = newState.playlist;
            playlist.push(action.payload.songKey);
            newState.playlist = playlist;
            return newState;
        case actionTypes.REMOVE_FROM_PLAYLIST:
            newState = { ...state };
            playlist = newState.playlist;
            playlist.splice(newState.playlist.indexOf(action.payload.songKey), 1);
            newState.playlist = playlist;
            return newState;
        default:
            return state;
    }
}

export default authReducer;