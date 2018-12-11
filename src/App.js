import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { getAllSongs } from './store/actions/songActions';
import { signIn, getUser } from './store/actions/userActions';

import Wrapper from './hoc/wrapper';
import Sidebar from './containers/sidebar';
import HomePage from './containers/pages/home-page';
import SearchPage from './containers/pages/search-page';
import NowPlayingPage from './containers/pages/now-playing-page';
import UserPlaylistPage from './containers/pages/user-playlist-page';
import UserPage from './containers/pages/user-page';
import MusicPlayer from './containers/music-player';

class App extends Component {

  componentDidMount() {
    this.props.getUser();
    this.props.getAllSongs();
  }

  render() {
    return (this.props.allSongs ?
      <BrowserRouter>
        <Wrapper>
          <Sidebar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/search/:keywords' component={SearchPage} />
            <Route path='/search' component={SearchPage} />
            <Route path='/song/:key' component={NowPlayingPage} />
            <Route path='/playlist' component={UserPlaylistPage} />
            {this.props.user && <Route path='/user' component={UserPage} />}
            <Redirect to='/'></Redirect>
          </Switch>
          <MusicPlayer />
        </Wrapper>
      </BrowserRouter>
      : null
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allSongs: state.songs.allSongs
  }
};

export default connect(mapStateToProps, { signIn, getUser, getAllSongs })(App);
