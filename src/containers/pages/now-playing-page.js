import React, { Component } from 'react';
import { connect } from 'react-redux';

import MusicPlayer from '../music-player';

import { songModel } from '../../models';

class NowPlayingPage extends Component {

    render() {
        const song = {
            ...songModel,
            ...this.props.allSongs[this.props.match.params.key],
            key: this.props.match.params.key
        };

        return (
            <div className='general-content now-playing'>
                <MusicPlayer song={song}/>
                <h3 className='lyric-header'>Lời Bài Hát</h3>
                <p className='lyric'>{song.lyric}</p>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        allSongs: state.songs
    }
}

export default connect(mapStateToProps)(NowPlayingPage);