import React from 'react';

export default ({label, type, input, style, placeholder, meta: {touched, error}}) => {
    return (

        <div className='row'>
            <div className='input-field' style={style}>
                <input id={input.name} type={type} placeholder={placeholder} {...input}/>
                <label htmlFor={input.name}>{label}</label>
                <div className='red-text'>{touched && error}</div>
            </div>
        </div>
    );

};