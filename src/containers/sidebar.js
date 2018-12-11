import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signIn } from '../store/actions/userActions';
import Wrapper from '../hoc/wrapper';

class sidebar extends Component {
    state = {
        shouldShowSideBar: false
    }

    toggleSidebar = () => {
        this.setState(prevState => ({
            shouldShowSideBar: !prevState.shouldShowSideBar
        }))
    }

    render() {
        return (
            <Wrapper>
                <div className={`sidebar ${this.state.shouldShowSideBar ? 'sidebar--active' : ''}`}>
                    <i className='fas fa-bars hamburger-btn btn' onClick={this.toggleSidebar}></i>
                    <div className='sidebar__logo'>
                        <Link to='/' className='navigator'>
                            <h3>Reactify</h3>
                        </Link>
                    </div>
                    <div className='sidebar__navigation'>
                        <NavLink to='/search'
                            className='sidebar__navigator sidebar__navigator--search'>
                            <i className='fa fa-search' />
                            <span>Tìm Kiếm</span>
                        </NavLink>
                        <NavLink to='/'
                            className='sidebar__navigator sidebar__navigator--home'>
                            <i className='fa fa-home' />
                            <span>Trang Chủ</span>
                        </NavLink>
                        <NavLink to='/playlist'
                            className='sidebar__navigator sidebar__navigator--plalist'>
                            <i className='fas fa-book-reader' />
                            <span>Playlist</span>
                        </NavLink>
                    </div>
                    {this.props.user ?
                        (
                            <Link to='/user' className='sidebar__authen sidebar__authen--after'>
                                <i className='far fa-user'></i>
                                <span>{this.props.user.displayName}</span>
                            </Link>
                        ) :
                        (<div className='sidebar__authen sidebar__authen--before'>
                            <span onClick={this.props.signIn}
                                className='sidebar__authen-option'>
                                Đăng Nhập
                            </span>
                        </div>)
                    }
                </div>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { signIn })(sidebar);