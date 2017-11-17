import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessages} from '../../actions/messageActions';

class Channel extends Component {
    render() {
        return (
            <div className='row'>
                <div className=''>
                    <a style={{cursor: 'pointer'}} onClick={() => this.props.fetchMessages(this.props.id)}>
                        <div className='card light-blue darken-3'>
                            <div className='card-content white-text'>
                                <span className='card-title'>{this.props.name}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default connect(null, {fetchMessages})(Channel);
