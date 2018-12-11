import React from 'react';

import ChartItem from './chart-item';

const chart = props => {

    return (
        <div className='chart'>
            <h3 className='chart__header'>BXH</h3>
            {props.songs.map(song => {
                return <ChartItem song={song} key={song.key} />
            })}
        </div>
    );
}

export default chart;