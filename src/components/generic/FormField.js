import React from 'react';

function _renderError(touched, error){
    if (touched && error){
        return <div className='red-text'>{error}</div>;
    }
    return null;
}

export default ({label, type, input, style, placeholder, meta: {touched, error}}) => {
    return (
        <div className='input-field' style={style}>
            <input id={input.name} type={type} placeholder={placeholder} {...input}/>
            <label htmlFor={input.name}>{label}</label>
            {_renderError(touched, error)}
        </div>
    );
};