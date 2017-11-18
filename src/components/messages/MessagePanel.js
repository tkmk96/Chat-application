import React, {Component} from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import MessagePanelHeader from './MessagePanelHeader';
import {connect} from 'react-redux';

class MessagePanel extends Component {
    render() {
        return(
            <div className='col s8 messagePanel'>
                {this.props.activeChannel &&
                    <div>
                        <MessagePanelHeader name={this.props.activeChannel.name}/>
                        <MessageList />
                        <MessageForm />
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps({activeChannel}) {
    return {
        activeChannel
    };
}
export default connect(mapStateToProps)(MessagePanel);