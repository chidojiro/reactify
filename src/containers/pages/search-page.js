import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchResult from '../search-result';

class SearchPage extends Component {
    state = {
        keywords: ''
    }

    onSubmit = e => {
        e.preventDefault();
        document.querySelector('.search-input__icon').click();
    }

    search = e => {
        if (!this.state.keywords) {
            e.preventDefault();
        }
        this.setState({
            keywords: ''
        })
    }

    render() {
        return (
            <div className='general-content search-page'>
                <form onSubmit={this.onSubmit} className='search-input'>
                    <input type='text'
                        placeholder='Tìm Bài Hát'
                        value={this.state.keywords}
                        onChange={e => this.setState({ keywords: e.target.value })} />
                    <Link to={`/search/${this.state.keywords}`}
                        className='search-input__icon'>
                        <i className='fa fa-search' />
                    </Link>
                </form>
                {this.props.match.params.keywords && <SearchResult {...this.props} />}
            </div>
        );
    }
}

export default SearchPage;
