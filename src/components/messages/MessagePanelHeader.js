import React from 'react';

export default (props) => {
    return (
        <div style={{marginBottom: '10px'}}>
            <h5 className='channelHeader'>{props.name}</h5>

            <div className='fixed-action-btn horizontal click-to-toggle channelMenuBtn' style={{position: 'absolute'}}>
                <a className='btn-floating btn-large red'>
                    <i className='material-icons'>menu</i>
                </a>
                <ul>
                    <li>
                        <a className='btn-floating yellow darken-1' title='Rename channel'>
                            <i className='material-icons'>edit</i>
                        </a>
                    </li>
                    <li>
                        <a className='btn-floating red' title='Delete channel'>
                            <i className='material-icons'>delete</i>
                        </a>
                    </li>
                    <li>
                        <a className='btn-floating green' title='Invite users'>
                            <i className='material-icons'>person_add</i>
                        </a>
                    </li>
                    <li>
                        <a className='btn-floating blue' title='Change privileges'>
                            <i className='material-icons'>verified_user</i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className='divider' style={{marginTop: '25px'}}/>
        </div>
    );
};