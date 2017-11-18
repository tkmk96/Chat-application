import React from 'react';

export default (props) => {
    return (
        <div style={{marginBottom: '10px'}}>
            <h5 className='center'>{props.name}</h5>
            <div className='divider' style={{marginTop: '25px'}}/>
        </div>
    );
};