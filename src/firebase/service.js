import firebase from './index';
import { songModel, userModel } from '../models';

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
    const result = await firebase.auth().signInWithPopup(provider);
    await firebase.database().ref(`users/${result.user.uid}`).update({
        displayName: result.user.displayName,
        email: result.user.email,
    });
    const user = await fetchUser(result.user.uid);
    return user;
}

export const signOut = () => {
    firebase.auth().signOut();
}

export const fetchUser = async uid => {
    const user = (await firebase.database().ref(`users/${uid}`).once('value')).val();
    return user ? {
        ...userModel,
        ...user,
        uid
    } : null;
}

export const getAllSongs = async () => {
    const $rawSongsFound = await firebase.database().ref(`songs`).once('value');
    const rawSongsFound = $rawSongsFound.val();
    // const songsFound = Object.keys(rawSongsFound).map(songKey => {
    //     return {
    //         ...songModel,
    //         ...rawSongsFound[songKey],
    //         key: songKey
    //     };
    // });
    return rawSongsFound;
}

export const getSongByKey = async key => {
    const song = (await firebase.database().ref(`songs/${key}`).once('value')).val();
    return {
        ...songModel,
        ...song,
        key
    };
}

export const likeSongActually = async (user, song) => {
    let likedUsers = (await firebase.database().ref(`songs/${song.key}/likedUsers`).once('value')).val() || [];
    likedUsers.push(user.uid);
    firebase.database().ref(`songs/${song.key}/likedUsers`).set(likedUsers);
}

export const unlikeSongActually = async (user, song) => {
    let likedUsers = (await firebase.database().ref(`songs/${song.key}/likedUsers`).once('value')).val();
    likedUsers.splice(likedUsers.indexOf(user.uid), 1);
    firebase.database().ref(`songs/${song.key}/likedUsers`).set(likedUsers);
}

export const addSongToUserPlaylistActually = async (user, song) => {
    let playlist = (await firebase.database().ref(`users/${user.uid}/playlist`).once('value')).val() || [];
    playlist.push(song.key);
    firebase.database().ref(`users/${user.uid}/playlist`).set(playlist);
}

export const removeSongFromUserPlaylistActually = async (user, song) => {
    let playlist = (await firebase.database().ref(`users/${user.uid}/playlist`).once('value')).val() || [];
    playlist.splice(playlist.indexOf(song.key), 1);
    firebase.database().ref(`users/${user.uid}/playlist`).set(playlist);
}

export const increaseViewForSong = async song => {
    let views = (await firebase.database().ref(`songs/${song.key}/views`).once('value')).val();
    views++;
    firebase.database().ref(`songs/${song.key}/views`).set(views);
}

export const getAllArtists = async () => {
    return (await firebase.database().ref(`artists`).once('value')).val();
}