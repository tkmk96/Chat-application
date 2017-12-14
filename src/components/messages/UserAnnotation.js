import React from 'react';

export const UserAnnotation = (props) => {
    return (
        <span className='annotation'>
            {props.children}
        </span>
    );
};