import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {logoutUser} from '../actions/index';



class Header extends Component {
    _onLogoutClick(){
        this.props.logoutUser();
        this.props.history.push('/login');
    }

    render(){
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/">
                            <h1>The channeling</h1>
                        </Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/profile">
                                ${this.props.user.email}
                            </Link>
                        </li>
                        <li>
                            <button className="btn btn-danger" onClick={this._onLogoutClick.bind(this)}>Log out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({user}) {
    return {user};
}

export default connect (mapStateToProps, {logoutUser})(withRouter(Header));
