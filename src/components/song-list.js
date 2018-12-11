import React from 'react';

import SongListItem from '../containers/song-list-item';

const songList = props => {
    return (
        <div className='search-result__song-list'>
            {props.songs.map(song => {
                return <SongListItem song={song} key={song.key} />
            })}
        </div>
    );
}

export default songList;