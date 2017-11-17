import React from 'react';

export default (props) => {
    return (
        <div className='row'>
            <div className=''>
                <div className='card light-blue darken-3'>
                    <div className='card-content white-text'>
                        <span className='card-title'>{props.name}</span>

                    </div>
                </div>
            </div>
        </div>
    
    );
};