import React from 'react';

export default ({title, className, style, iconName, onClick}) => {
    return (
        <a className={`btn-floating ${className}`}
            title={title}
            style={style}
            onClick={() => onClick && onClick()}
        >
            <i className='material-icons'>{iconName}</i>
        </a>
    );
};