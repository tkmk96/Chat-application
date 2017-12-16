import React from 'react';
import PropTypes from 'prop-types';

const UserAnnotation = (props) => {
    return (
        <span className='annotation'>
            {props.children}
        </span>
    );
};

export default UserAnnotation;

UserAnnotation.propTypes = {
    children: PropTypes.any
};