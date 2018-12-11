import * as actionTypes from './actionTypes';

import * as firebaseService from '../../firebase/service';
import { songModel } from '../../models';

export const getAllSongs = () => {
    return async dispatch => {
        const songs = await firebaseService.getAllSongs();
        Object.keys(songs).forEach(songKey => {
            songs[songKey] = {
                ...songModel,
                ...songs[songKey]
            }
        })
        dispatch({
            type: actionTypes.GET_ALL_SONGS,
            payload: songs,
        });
    }
}

export const likeSong = (user, song) => {
    firebaseService.likeSongActually(user, song);
    return {
        type: actionTypes.LIKE_SONG,
        payload: {
            userUid: user.uid,
            songKey: song.key
        }
    }
}

export const unlikeSong = (user, song) => {
    firebaseService.unlikeSongActually(user, song);
    return {
        type: actionTypes.UNLIKE_SONG,
        payload: {
            userUid: user.uid,
            songKey: song.key
        }
    }
}

export const selectNowPlaying = key => {
    return {
        type: actionTypes.SELECT_NOW_PLAYING,
        payload: {
            songKey: key
        }
    }
}

export const playPlaylist = playlist => {
    return {
        type: actionTypes.PLAY_PLAYLIST,
        payload: {
            playlist
        }
    }
}

export const stopPlaying = () => {
    return {
        type: actionTypes.STOP_PLAYING,
    }
}