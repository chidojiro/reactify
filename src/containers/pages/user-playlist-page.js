import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { removeSongFromUserPlaylist } from '../../store/actions/userActions';
import { selectNowPlaying, playPlaylist, stopPlaying } from '../../store/actions/songActions';

import Wrapper from '../../hoc/wrapper';
import { songModel } from '../../models';

const defaultState = {
    isEditing: false
}

class UserPlaylistPage extends Component {
    state = defaultState;

    onEditClick = () => {
        this.props.stopPlaying();
        this.setState({
            isEditing: true,
        });
    }

    onBackClick = () => {
        this.setState(defaultState);
    }

    onDeleteClick = songKey => {
        this.props.removeSongFromUserPlaylist(this.props.user, {
            ...this.props.allSongs[songKey],
            ...songModel,
            key: songKey
        });
    }

    onSongInPlaylistClick = songKey => {
        this.props.selectNowPlaying(songKey);
        this.props.playPlaylist(this.props.user.playlist);
    }

    render() {
        if (!this.props.user) {
            alert('Please Sign In');
            return <Redirect to='/' />
        }
        let userPlaylist;
        if (!this.props.user.playlist || this.props.user.playlist.length === 0) {
            userPlaylist = <h4>Chưa Có Bài Hát Nào</h4>
        } else {
            userPlaylist = (
                <Wrapper>
                    <div className='user-playlist__songs'>
                        {this.props.user.playlist.map((songKey, i) => {
                            return (
                                <div key={songKey} >
                                    <div
                                        className={`user-playlist__song`}
                                    >
                                        <h4 className={`song-title ${this.state.isEditing ? 'disabled' : ''}`}
                                            onClick={() => this.onSongInPlaylistClick(songKey)}>
                                            {i + 1}. {this.props.allSongs[songKey].title} - {this.props.allSongs[songKey].artists.join(', ')}
                                        </h4>
                                        {
                                            this.props.nowPlaying && songKey === this.props.nowPlaying.key && !this.state.isEditing ?
                                                <i className='fas fa-play-circle'></i>
                                                : null
                                        }
                                        {
                                            this.state.isEditing ?
                                                <i className='fas fa-trash user-playlist__remove btn' onClick={() => this.onDeleteClick(songKey)}></i> :
                                                null
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Wrapper>
            )
        }
        return (
            <div className='general-content user-playlist'>
                <div className='user-playlist__header with-seperator'>
                    <h2>Playlist Của Bạn</h2>
                    <i className={`fas fa-edit btn ${this.state.isEditing ? 'disabled' : ''}`} onClick={this.onEditClick}></i>
                </div>
                {userPlaylist}
                {
                    this.state.isEditing ?
                        <div
                            className='btn playlist-save'
                            onClick={this.onBackClick}>
                            <strong>&lt; Quay Lại</strong>
                        </div> :
                        null
                }

            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    nowPlaying: state.songs.nowPlaying,
    allSongs: state.songs.allSongs
})

export default connect(mapStateToProps, { removeSongFromUserPlaylist, selectNowPlaying, playPlaylist, stopPlaying })(UserPlaylistPage);
