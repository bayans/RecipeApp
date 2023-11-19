import React from 'react';
import './Input.css';

const Input = (props) => {

    const { className, type, id, name, value, defaultValue, inputRef, accept, onChange, onKeyDown, placeholder, required } = props;

    const inputProps = {};

    if(accept) {
        inputProps.accept = accept;
    }

    return (
        <input
            type={type}
            id={id ?? name}
            className={className}
            name={name}
            value={value}
            ref={inputRef}
            defaultValue={defaultValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            required={required}
            placeholder={placeholder}
            {...inputProps}
        />
    );
}

export default Input;
