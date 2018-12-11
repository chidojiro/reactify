import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as utils from '../utilFunctions';
import { songModel } from '../models';

import SongList from '../components/song-list';
import Paging from '../components/paging';

class SearchResult extends Component {
    componentWillUpdate = () => {
        window.scrollTo(0, 0);
    }

    componentDidUpdate = () => {
        window.scrollTo(0, 0);
    }

    state = {
        keywords: null,
        songsToShow: null,
        page: 1,
        totalSongs: 0,
    }

    getPageQuery = () => {
        const query = this.props.location.search;
        const search = new URLSearchParams(query);
        const page = search.get('page') ? +search.get('page') : 1;
        return page;
    }

    filterSongsToShow = (songs, page) => {
        const songsToShow = songs.slice((page - 1) * 10, page * 10);
        return songsToShow;
    }

    filterSongsByKeywords = keywords => {
        keywords = utils.standardizeVietnamese(keywords);
        const songsFound = Object.keys(this.props.allSongs).reduce((result, songKey) => {
            const song = this.props.allSongs[songKey];
            const combinedTitle = utils.standardizeVietnamese(
                (song.title + song.artists.join(' '))
                    .toLowerCase());
            if (combinedTitle.indexOf(keywords) !== -1) {
                return [...result, { ...songModel, ...song, key: songKey }];
            } else return result;
        }, []);
        return songsFound;
    }

    goToPage = (page) => {
        this.props.history.push(`${this.props.location.pathname}?page=${page}`);
    }

    render() {
        const keywords = this.props.match.params.keywords;
        const page = this.getPageQuery();
        const songsFound = this.filterSongsByKeywords(keywords);
        const songsToShow = this.filterSongsToShow(songsFound, page);
        const total = songsFound.length;
        return (
            <div className='search-result'>
                <span className='search-result__total'>{`${total} Kết Quả:`}</span>
                <SongList songs={songsToShow} ></SongList>
                <Paging page={page} max={Math.ceil(total / 10)} goToPage={this.goToPage} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        allSongs: state.songs.allSongs
    }
}
export default connect(mapStateToProps)(SearchResult);