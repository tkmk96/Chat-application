import React from 'react';

export default ({label, type, input, meta: {touched, error}}) => {
    const errorClass = touched && error ? ' has-error' : '';
    return (
        <div className={'form-group' + errorClass}>
            <label className='control-label' htmlFor={input.name}>{label}</label>
            <input id={input.name} className='form-control' type={type} {...input}/>
            <div className='text-danger'>{touched && error}</div>
        </div>
    );

};