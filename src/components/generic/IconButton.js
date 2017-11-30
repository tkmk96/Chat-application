import React from 'react';

export default ({title, className, style, iconName, onClick, type}) => {
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