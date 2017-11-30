import React, {Component} from 'react';
import IconButton from '../generic/IconButton';

class MessageEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            scroll: true
        };
    }

    componentDidMount() {
        this.input.focus();
        this.setState({text: this.props.message.value});
    }

    componentDidUpdate() {
        if (this.state.scroll) {
            this.input.scrollLeft = this.input.scrollWidth;
            this.setState({scroll: false});
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={() => this._onSave()}>
                    <div className='col s10 messageEdit'>
                        <input id={this.props.message.id} ref={(input) => this.input = input} value={this.state.text} type='text' onChange={(e) => this.setState({text: e.target.value})}/>
                    </div>
                    <div className='col s2 center'>
                        <IconButton iconName='check' className='editBtn' title='Save' type='submit' onClick={() => this._onSave()}/>
                        <IconButton iconName='close' className='red editBtn' title='Cancel' onClick={() => this.props.onCancel()}/>
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