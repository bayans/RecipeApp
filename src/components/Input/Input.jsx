import React from 'react';
import './Input.css';

const Input = (props) => {

    const { className, type, id, name, value, defaultValue, inputRef, onChange, onKeyDown, placeholder, required } = props;

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
        />
    );
}

export default Input;
