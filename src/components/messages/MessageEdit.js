import React, {Component} from 'react';
import IconButton from '../generic/IconButton';

class MessageEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <div>
                <form onSubmit={() => this._onSave()}>
                    <div className='col s10 messageEdit'>
                        <input type='text' placeholder='Type a new message' onChange={(e) => this.setState({text: e.target.value})}/>
                    </div>
                    <div className='col s2 center'>
                        <IconButton iconName='check' title='save' type='submit' onClick={() => this._onSave()}/>
                    </div>
                </form>
            </div>
        );
    }

    _onSave() {
        const message = {...this.props.message};
        message.value = this.state.text;
        this.props.onEdit(message);
    }

}

export default MessageEdit;