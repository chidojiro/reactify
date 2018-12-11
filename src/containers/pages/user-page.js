import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOut } from '../../store/actions/userActions';

class UserPage extends Component {
    render() {
        return (
            <div className='general-content user-page'>
                <i className='far fa-user user__avatar'></i>
                <button className='user__operation' onClick={this.props.signOut}>Đăng Xuất</button>
            </div>
        )
    }
}

export default connect(null, { signOut })(UserPage);