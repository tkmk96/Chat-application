import React from 'react';

export default ({label, type, input, meta: {touched, error}}) => {
    return (

        <div className='row'>
            <div className='input-field'>
                <input id={input.name} type={type} {...input}/>
                <label htmlFor={input.name}>{label}</label>
                <div className='red-text'>{touched && error}</div>
            </div>
        </div>
    );

};