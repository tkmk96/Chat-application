import React from 'react';

export default (props) => {
    return (
        <div className='panel panel-info'>
            <div className='panel-heading'>
                <h3 className='panel-title'>{props.name}</h3>
            </div>
            <div className='panel-body'/>
        </div>
    );
};