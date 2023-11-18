import React from 'react';
import './Button.css';

const Button = (props) => {

  const { text, type, id, className, onClick, disabled, showBtn, children } = props;
  
  return (
    <button
    id={id}
    type={type}
    className={className}
    onClick={onClick}
    disabled={disabled}
    style={{"display": showBtn ? "inline" : "none"}}
  >
    {text}
    {children}
  </button>
  );
}

export default Button;