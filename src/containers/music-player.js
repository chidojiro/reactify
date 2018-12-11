import React, { Component } from 'react';
import Wrapper from '../hoc/wrapper';
import { connect } from 'react-redux';

import { addSongToUserPlaylist, removeSongFromUserPlaylist } from '../store/actions/userActions';
import { likeSong, unlikeSong, selectNowPlaying, playPlaylist } from '../store/actions/songActions';
import { increaseViewForSong } from '../firebase/service';

class MusicPlayer extends Component {

    state = {
        playlist: null,
        user: null,
        isPlaying: false,
        volume: 1,
        shouldLoop: false,
        isMuted: false,
        playedPercentage: 0,
        isInPlaylist: false,
        isLiked: false,
        shouldShuffle: false
    }

    interval = null;
    audio = null;

    componentWillMount = () => {
        const isMuted = localStorage.getItem('isMuted');
        const volume = localStorage.getItem('volume');
        const shouldLoop = !!localStorage.getItem('shouldLoop');
        const shouldShuffle = !!localStorage.getItem('shouldShuffle');
        this.setState({
            isMuted: !!isMuted,
            volume: volume ? Number(volume) : 1,
            shouldShuffle,
            shouldLoop
        });
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.audio.volume = this.state.volume;
    }

    componentWillReceiveProps = newProps => {
        if (newProps.nowPlaying !== this.props.nowPlaying) {
            this.audio.load();
            clearInterval(this.interval);
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    play = () => {
        this.setState({ isPlaying: true });
        this.interval = setInterval(() => {
            this.setState({ playedPercentage: this.audio.currentTime / this.audio.duration });
        }, 50);
    }

    isSongInPlaylist = () => {
        if (!this.props.user) {
            return false;
        }
        return this.props.user.playlist.indexOf(this.props.nowPlaying.key) !== -1;
    }

    didUserLikeThisSong = () => {
        if (!this.props.user) {
            return false;
        }
        return this.props.nowPlaying.likedUsers.indexOf(this.props.user.uid) !== -1;
    }

    onEnded = () => {
        clearInterval(this.interval);
        this.setState({ isPlaying: false });
        if (this.props.playlist) {
            this.next();
        }
    }

    onPlayClick = () => {
        this.play();
        this.audio.play();
    }

    onCanPlay = () => {
        increaseViewForSong(this.props.nowPlaying);
        this.play();
    }

    onPauseClick = () => {
        this.audio.pause();
        clearInterval(this.interval);
        this.setState({ isPlaying: false });
    }

    onLoopClick = () => {
        if (!this.state.shouldLoop) {
            localStorage.setItem('shouldLoop', 'true');
            this.setState({ shouldLoop: true });
        } else {
            localStorage.removeItem('shouldLoop');
            this.setState({ shouldLoop: false });
        }
    }

    onAddClick = () => {
        if (!this.props.user) {
            return alert('Please Sign In!');
        }
        this.props.addSongToUserPlaylist(this.props.user, this.props.nowPlaying);
    }

    onCheckClick = () => {
        this.props.removeSongFromUserPlaylist(this.props.user, this.props.nowPlaying);
    }

    onHeartClick = () => {
        if (!this.props.user) {
            return alert('Please Sign In!');
        }
        this.didUserLikeThisSong() ?
            this.props.unlikeSong(this.props.user, this.props.nowPlaying)
            : this.props.likeSong(this.props.user, this.props.nowPlaying);
    }

    onProgressChange = e => {
        clearInterval(this.interval);
        this.audio.currentTime = e.target.value * this.audio.duration;
    }

    onVolumeChange = e => {
        this.audio.volume = Number(e.target.value);
        localStorage.setItem('volume', e.target.value);
        localStorage.removeItem('isMuted');
        this.setState({
            isMuted: false,
            volume: this.audio.volume
        });
    }

    onMuteClick = () => {
        localStorage.setItem('isMuted', 'true');
        this.setState({
            isMuted: true,
            volume: 0,
        });
    }

    onUnmuteClick = () => {
        localStorage.removeItem('isMuted');
        this.setState({
            isMuted: false,
            volume: this.audio.volume,
        });
    }

    onShuffleClick = () => {
        if (!this.state.shouldShuffle) {
            localStorage.setItem('shouldShuffle', 'true');
            this.setState({ shouldShuffle: true });
        } else {
            localStorage.removeItem('shouldShuffle');
            this.setState({ shouldShuffle: false });
        }
    }

    next = () => {
        let newIndex;
        if (!this.state.shouldShuffle) {
            newIndex = this.props.playlist.indexOf(this.props.nowPlaying.key) + 1;
            if (newIndex === this.props.playlist.length) {
                newIndex = 0;
            }
        } else {
            newIndex = Math.floor(Math.random() * this.props.playlist.length);
        }
        const newSongKey = this.props.playlist[newIndex];
        this.props.selectNowPlaying(newSongKey);
        this.props.playPlaylist(this.props.playlist);
    }

    previous = () => {
        let newIndex;
        if (!this.state.shouldShuffle) {
            newIndex = this.props.playlist.indexOf(this.props.nowPlaying.key) - 1;
            if (newIndex === 0) {
                newIndex = this.props.playlist.length;
            }
        } else {
            newIndex = Math.floor(Math.random() * this.props.playlist.length);
        }
        const newSongKey = this.props.playlist[newIndex];
        this.props.selectNowPlaying(newSongKey);
        this.props.playPlaylist(this.props.playlist);
    }

    render() {
        return (
            <Wrapper>
                <audio
                    controls
                    style={{ display: 'none' }}
                    autoPlay
                    ref={audio => { this.audio = audio }}
                    onCanPlay={this.onCanPlay}
                    onEnded={this.onEnded}
                    loop={this.state.shouldLoop}
                    muted={this.state.isMuted}>
                    {this.props.nowPlaying && <source src={this.props.nowPlaying.downloadURL} />}
                </audio>
                <div className={`music-player ${!this.props.nowPlaying ? 'disabled' : ''}`}>
                    <div className='music-player__song-info'>
                        {
                            this.props.nowPlaying && (
                                <Wrapper>
                                    <div className='avatar'>
                                        <i className='fas fa-music'></i>
                                    </div>
                                    <div>
                                        <h5 className='music-player__song-info--primary'>
                                            {this.props.nowPlaying.title}
                                        </h5>
                                        <h5 className='music-player__song-info--secondary'>
                                            {this.props.nowPlaying.artists.join(', ')}
                                        </h5>
                                    </div>
                                    <div className='music-player__interaction'>
                                        <div className='view'>
                                            <i className='fa fa-headphones'
                                                title='Số lượt nghe'></i>
                                            {this.props.nowPlaying && <span>{this.props.nowPlaying.views}</span>}
                                        </div>
                                        <i
                                            className={`fa fa-heart btn ${this.didUserLikeThisSong() ? 'liked' : ''}`}
                                            onClick={this.onHeartClick}
                                            title='Thích bài hát'></i>
                                        {
                                            this.isSongInPlaylist() ?
                                                <i className={`fas fa-check btn ${this.props.playlist ? 'disabled' : ''}`}
                                                    onClick={this.onCheckClick}
                                                    title='Xoá khỏi playlist'></i>
                                                : <i className='fa fa-plus btn'
                                                    onClick={this.onAddClick}
                                                    title='Thêm vào playlist'></i>
                                        }
                                    </div >
                                </Wrapper>
                            )
                        }
                    </div>
                    <div className='music-player__main'>
                        <div className='music-player__controls'>
                            <i
                                className={
                                    `fas fa-random btn 
                                    ${!this.props.playlist ? 'disabled' : ''} 
                                    ${this.state.shouldShuffle ? 'active-shuffle' : ''}`
                                }
                                onClick={this.onShuffleClick}>
                            </i>
                            <i className={`fas fa-step-backward btn  ${!this.props.playlist ? 'disabled' : ''}`}
                                onClick={this.previous} />
                            {
                                !this.state.isPlaying ?
                                    <i onClick={this.onPlayClick} className='fas fa-play btn'></i>
                                    : <i onClick={this.onPauseClick} className='fas fa-pause btn'></i>
                            }
                            <i className={`fas fa-step-forward btn ${!this.props.playlist ? 'disabled' : ''}`}
                                onClick={this.next} />
                            <i className={`fas fa-retweet btn ${this.state.shouldLoop ? 'active-loop' : ''}`}
                                onClick={this.onLoopClick}></i>
                        </div>
                        <div className='music-player__progress'>
                            <input type='range'
                                className='slider'
                                value={this.props.nowPlaying ? this.state.playedPercentage : 0}
                                max='1'
                                min='0'
                                step='0.0001'
                                onChange={this.onProgressChange} />
                        </div>
                    </div>
                    <div className='music-player__volume'>
                        {
                            this.state.isMuted || this.state.volume === 0 ?
                                <i className='fas fa-volume-mute btn' onClick={this.onUnmuteClick}></i>
                                : <i className='fas fa-volume-up btn' onClick={this.onMuteClick}></i>
                        }
                        <input
                            type='range'
                            ref={volume => { this.volume = volume }}
                            className='music-player__volume-adjuster slider'
                            max='1'
                            min='0'
                            step='0.0001'
                            value={this.state.isMuted ? 0 : this.state.volume}
                            onChange={this.onVolumeChange} />
                    </div>
                </div >
            </Wrapper >
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    nowPlaying: state.songs.nowPlaying,
    playlist: state.songs.playlist
})

export default connect(
    mapStateToProps,
    {
        likeSong,
        unlikeSong,
        addSongToUserPlaylist,
        removeSongFromUserPlaylist,
        selectNowPlaying,
        playPlaylist
    })(MusicPlayer);