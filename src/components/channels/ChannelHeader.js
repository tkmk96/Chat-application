import React, {Component} from 'react';

class ChannelHeader extends Component {
    _renderDetailPageButtons(){
        return (
            <button
                onClick={this.props.onDetail}
                className='btn-floating btn-large red'
            >
                <i className='material-icons'>undo</i>
            </button>
        );
    }

    _renderDetailButton(){
        return (
            <a className='btn-floating blue' title='Detail' onClick={this.props.onDetail}>
                <i className='material-icons'>info_outline</i>
            </a>
        );
    }
    _renderEditButton(){
        return (
            <a className='btn-floating blue' title='Edit' onClick={this.props.onDetail}>
                <i className='material-icons'>build</i>
            </a>
        );
    }

    _renderLeaveButton(){
        return (
            <li>
                <a className='btn-floating yellow darken-2' title='Leave'>
                    <i className='material-icons'>cancel</i>
                </a>
            </li>
        );
    }

    _renderDeleteButton(){
        return (
            <li>
                <a className='btn-floating red darken-2' title='Delete'>
                    <i className='material-icons'>delete</i>
                </a>
            </li>
        );
    }

    _renderChannelPageButtons(){
        return (
            <div className='fixed-action-btn horizontal click-to-toggle channelMenuBtn' style={{position: 'absolute'}}>
                <a className='btn-floating btn-large red'>
                    <i className='material-icons'>menu</i>
                </a>
                <ul>
                    {this.props.owner && this._renderDeleteButton()}
                    {!this.props.owner && this._renderLeaveButton()}
                    <li>
                        {this.props.owner || this.props.admin ? this._renderEditButton() : this._renderDetailButton()}
                    </li>


                </ul>
            </div>
        );
    }

    render(){
        return (
            <div style={{marginBottom: '10px'}}>
                <h5 className='channelHeader'>{this.props.name}</h5>

                {this.props.detail ? this._renderDetailPageButtons() : this._renderChannelPageButtons()}


                <div className='divider' style={{marginTop: '25px'}}/>
            </div>
        );
    }
}

export default ChannelHeader;