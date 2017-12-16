import React, {Component} from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

class MessagePanel extends Component {

    constructor(props){
        super(props);

        this.state = {
            editedMessage: null
        };
    }

    componentWillReceiveProps() {
        this.setState({editedMessage: null});
    }

    render() {
        return (
            <div>
                <div>
                    <MessageList onEdit={(message) => this._onEdit(message)}/>
                    <div className='divider' style={{marginTop: '10px'}}/>
                    {this.state.editedMessage
                        ? <MessageForm
                            editedMessage={this.state.editedMessage}
                            clearEditedMessage={() => this._clearEditedMessage()}
                        />
                        : <MessageForm/>}
                </div>
            </div>
        );
    }

    _onEdit(message){
        this.setState({editedMessage: message});
    }

    _clearEditedMessage(){
        this.setState({editedMessage: null});
    }
}

export default MessagePanel;