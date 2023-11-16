import React from 'react';
import './Button.css';

const Button = (props) => {

  const { text, type, id, className, onClick } = props;

  return (
      <button
        id={id}
        type={type}
        className={className}
        onClick={onClick}
      >
        {text}
      </button>
  );
}

export default Button;