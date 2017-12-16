import React from 'react';
import PropTypes from 'prop-types';

function _renderError(touched, error){
    if (touched && error){
        return <div className='red-text'>{error}</div>;
    }
    return null;
}

const FormField = ({label, type, input, style, placeholder, meta: {touched, error}}) => {
    return (
        <div className='input-field' style={style}>
            <input id={input.name} type={type} placeholder={placeholder} {...input}/>
            <label htmlFor={input.name}>{label}</label>
            {_renderError(touched, error)}
        </div>
    );
};

export default FormField;

FormField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.object,
};