import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProfileForm from './ProfileForm';

class Profile extends Component {
    render(){
        return (
            <div className="row">
                <div className="col s6 offset-s3">
                    <h5>Email: {this.props.user.email}</h5>
                    <h5>Name: {this.props.user.name}</h5>
                    <div className='divider'/>
                    <ProfileForm/>
                </div>

            </div>
        );
    }
}

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps, null)(Profile);