import React from 'react';
import Input from "../Input/Input";
import Button from '../Button/Button';
import './Form.css';

const Form = (props) => {

    const { formClass, fields, onSubmit, submitButton } = props;

    const handleChange = (e, func) => {
        func(e.target.value);
    }

    const getFieldByType = (field, index) => {
        switch (field.fieldType) {
            case 'label-input':
                return (
                    <div key={index}>
                        <label htmlFor={field.name} className='form-label'>{field.label}</label>
                        <Input
                            className='form-input'
                            type={field.type || 'text'}
                            id={field.name}
                            name={field.name}
                            value={field.input}
                            onChange={(e) => handleChange(e, field.onChange)}
                            required={field.required}
                        />
                    </div>
                );
            default: return false
        }
    }

    return (
        <form className={formClass} onSubmit={onSubmit}>

            {fields.map((field, index) => (
                getFieldByType(field, index)
            ))}

            <Button
                type="submit"
                className='button'
                text={submitButton}
            />
        </form>
    );
}

export default Form;
