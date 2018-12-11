import { signInWithGoogle, signOut as firebaseSignOut, fetchUser, addSongToUserPlaylistActually, removeSongFromUserPlaylistActually } from '../../firebase/service';

import * as actionTypes from './actionTypes';
import { userModel } from '../../models';

export const signIn = () => {
    return async dispatch => {
        const user = await signInWithGoogle();
        localStorage.setItem('localUser', user.uid);
        dispatch({
            type: actionTypes.SIGN_IN,
            payload: user,
        });
    }
}

export const signOut = () => {
    firebaseSignOut();
    localStorage.removeItem('localUser');
    return {
        type: actionTypes.SIGN_OUT,
    };
}

export const getUser = () => {
    return async dispatch => {
        const localUser = localStorage.getItem('localUser');
        const user = localUser ? await fetchUser(localUser) : null;
        dispatch({
            type: actionTypes.GET_USER,
            payload: user ? {
                ...userModel,
                ...user
            } : null
        });
    }
}

export const addSongToUserPlaylist = (user, song) => {
    addSongToUserPlaylistActually(user, song)
    return {
        type: actionTypes.ADD_TO_PLAYLIST,
        payload: {
            songKey: song.key
        }
    }
}

export const removeSongFromUserPlaylist = (user, song) => {
    removeSongFromUserPlaylistActually(user, song);
    return {
        type: actionTypes.REMOVE_FROM_PLAYLIST,
        payload: {
            songKey: song.key
        }
    }
}