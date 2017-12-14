import React, {Component} from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import {connect} from 'react-redux';

class MessagePanel extends Component {
    constructor(props){
        super(props);

        this.state = {
            editedMessage: null
        };
    }

    render() {
        return (
            <div>
                <div>
                    <MessageList onEdit={(message) => this._onEdit(message)}/>
                    <div className='divider' style={{marginTop: '10px'}}/>
                    {this.state.editedMessage
                        ? <MessageForm editedMessage={this.state.editedMessage} onEditCancel={() => this._onEditCancel()}/>
                        : <MessageForm/>}
                </div>
            </div>
        );
    }

    _onEdit(message){
        console.log(message);
        this.setState({editedMessage: message});
    }

    _onEditCancel(){
        this.setState({editedMessage: null});
    }
}

function mapStateToProps({activeChannel}) {
    return {
        activeChannel
    };
}

export default connect(mapStateToProps)(MessagePanel);