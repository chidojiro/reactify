import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectNowPlaying } from '../store/actions/songActions';

class featureArtist extends Component {
    render() {
        return (
            <div className='feature-artist'>
                <h3 className="feature-artist__name with-seperator">
                    {this.props.artist.name}
                </h3>
                <div className='feature-artist__songs'>
                    {this.props.artist.featureSongs.map(song => {
                        return (
                            <div className='feature-artist__song' key={song.key}>
                                <div className="avatar">
                                    <i className="fas fa-music"></i>
                                </div>
                                <div>
                                    <h4 onClick={() => this.props.selectNowPlaying(song.key)}
                                        className="feature-artist__song-info song-title">
                                        {song.title}
                                    </h4>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default connect(null, { selectNowPlaying })(featureArtist);