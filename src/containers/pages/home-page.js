import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../../components/chart'
import FeatureArtist from '../../components/feature-artist';

import { getAllArtists } from '../../firebase/service';
import { songModel } from '../../models';

class HomePage extends Component {
    state = {
        featureArtists: null
    }

    componentDidMount = async () => {
        const featureArtists = await this.getFeatureArtists(4);
        this.setState({
            featureArtists
        });
    }

    getHighestViewSong = () => {
        const highestViewSongs = Object.keys(this.props.allSongs).map(songKey => {
            return {
                ...this.props.allSongs[songKey],
                key: songKey
            }
        }).sort((a, b) => {
            return b.views - a.views;
        }).slice(0, 10);
        return highestViewSongs;
    }

    getFeatureArtists = async num => {
        const artists = await getAllArtists();
        const featureArtists = Object.keys(artists).map(artistName => {
            const views = artists[artistName].reduce((temp, songKey) => {
                return temp + this.props.allSongs[songKey].views;
            }, 0);
            return {
                name: artistName,
                views
            }
        }).sort((a, b) => {
            return b.views - a.views;
        }).slice(0, num).map(artist => {
            const featureSongs = artists[artist.name].map(songKey => {
                return {
                    ...songModel,
                    ...this.props.allSongs[songKey],
                    key: songKey
                };
            }).sort((a, b) => {
                return b.views - a.views;
            }).slice(0, num);
            return {
                ...artist,
                featureSongs
            }
        });
        return featureArtists;
    }

    render() {
        console.log('asd');
        return (this.state.featureArtists ?
            <div className='general-content home-page'>
                <div className='feature-artists'>
                    <h3 className='feature-artists__header'>Ca Sĩ Nổi Bật</h3>
                    {this.state.featureArtists.map(artist => {
                        return (
                            <FeatureArtist
                                artist={artist}
                                key={artist.name} />
                        )
                    })}
                </div>
                <Chart songs={this.getHighestViewSong()} />
            </div>
            : null
        )
    }
}

const mapStateToProps = state => ({
    allSongs: state.songs.allSongs
})

export default connect(mapStateToProps)(HomePage);