import React from 'react';

export default (props) => {
    return (
        <div className='messagePanelHeader'>
            <h5 className='center'>{props.name}</h5>
            <div className='divider'/>
        </div>
    );
};