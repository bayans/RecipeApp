import React from 'react';

const Input = (props) => {

    const { className, type, id, name, value, onChange, placeholder, required } = props;

    return (
        <input
            type={type}
            id={id ?? name}
            className={className}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
        />
    );
}

export default Input;
