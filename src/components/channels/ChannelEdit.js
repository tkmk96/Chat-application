import React, {Component} from 'react';
import ChannelForm from './ChannelForm';

class ChannelEdit extends Component {
    render() {
        return(
            <div className='col s6'>
                <ChannelForm name={this.props.name} onCancel={this.props.onCancel}/>
            </div>
        );
    }
}

export default ChannelEdit;