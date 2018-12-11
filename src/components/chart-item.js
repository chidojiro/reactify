import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectNowPlaying } from '../store/actions/songActions';

class ChartItem extends Component {
    render() {
        return (
            <div className='chart__song with-seperator'>
                <div className='avatar'>
                    <i className='fas fa-music'></i>
                </div>
                <div className='chart__song-info'>
                    <h4 onClick={() => this.props.selectNowPlaying(this.props.song.key)}
                        className='chart__song-info--primary song-title'>
                        {this.props.song.title}
                    </h4>
                    <h5 className='chart__song-info--secondary'>{this.props.song.artists.join(', ')}</h5>
                </div >
            </div>
        );
    }
}

export default connect(null, { selectNowPlaying })(ChartItem);


