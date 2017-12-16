import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setActiveChannel} from '../../actions';
import PropTypes from 'prop-types';

class ChannelItem extends Component {
    static propTypes = {
        setActiveChannel: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    };
    render() {
        return (
            <div className='row'>
                <div className=''>
                    <a style={{cursor: 'pointer'}} onClick={() => this.props.setActiveChannel(this.props.id)}>
                        <div className='card light-blue darken-3 channel'>
                            <div className='card-content white-text'>
                                <span className='card-title truncate'>{this.props.name}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default connect(null, {setActiveChannel})(ChannelItem);
