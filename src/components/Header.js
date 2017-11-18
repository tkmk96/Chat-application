import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {logoutUser} from '../actions/index';

class Header extends Component {
    _onLogoutClick(){
        this.props.logoutUser();
        this.props.history.push('/');
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link className='brand-logo' to="/" style={{marginLeft: '15px'}}>
                        The channeling
                    </Link>
                    {this.props.user.name &&
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <Link to="/profile">
                                    {this.props.user.name}
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="btn"
                                    onClick={this._onLogoutClick.bind(this)}
                                    style={{margin: '0 15px 0 10px'}}
                                >
                                    Log out
                                </button>
                            </li>
                        </ul>
                    }
                </div>
            </nav>
        );
    }
}

function mapStateToProps({user}) {
    return {user};
}

export default connect (mapStateToProps, {logoutUser})(Header);
