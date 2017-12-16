import React from 'react';
import PropTypes from 'prop-types';

const IconButton = ({title, className, style, iconName, onClick, type}) => {
    className = className || '';
    return (
        <a className={`btn-floating ${className}`}
            title={title}
            style={style}
            onClick={() => onClick && onClick()}
            type={type}
        >
            <i className='material-icons'>{iconName}</i>
        </a>
    );
};

export default IconButton;

IconButton.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    style: PropTypes.object,
};