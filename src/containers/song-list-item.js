import React, { Component } from 'react';
import { connect } from 'react-redux';

import Wrapper from '../hoc/wrapper';

import { selectNowPlaying } from '../store/actions/songActions';

class SongListItem extends Component {
    render() {
        return (
            <div className='search-result__song'>
                <div className='avatar'>
                    <i className='fas fa-music'></i>
                </div>
                <div>
                    <div className='search-result__song-title'>
                        <h4 className='search-result__song-title--primary song-title'
                            onClick={() => this.props.selectNowPlaying(this.props.song.key)}>
                            {`${this.props.song.title} - ${this.props.song.artists.join(', ')}`}
                        </h4>
                        {
                            this.props.user && this.props.user.isAdmin && (
                                <Wrapper>
                                    <i className='fas fa-edit admin-operation btn'></i>
                                    <i className='fas fa-trash admin-operation btn'></i>
                                </Wrapper>
                            )
                        }
                    </div>
                    <h5 className='search-result__song-title--secondary'>
                        {`Thể Loại: ${this.props.song.genres.join(', ')}`}
                    </h5>
                </div >
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { selectNowPlaying })(SongListItem);


