import React from 'react';
import Input from "../Input/Input";
import Button from '../Button/Button';
import './Form.css';

const Form = (props) => {

    const { formClass, formFields, onSubmit, submitButton, submitDisabled, children } = props;

    const showSubmitBtn = props.showSubmitBtn ?? true;

    const handleChange = (e, func) => {
        func(e.target.value);
    }

    const mapFields = (fields) => fields.map((field, index) => getFieldByType(field, index));

    const addParentToMapFields = (fields) => (<div id={formFields.parent}>{mapFields(fields)}</div>);

    const getFieldByType = (field, index) => {
        switch (field.fieldType) {
            case 'label-input':
                return (
                    <div key={index}>
                        <label htmlFor={field.name} className='form-label'>{field.label}</label>
                        <Input
                            className='form-input'
                            type={field.type || 'text'}
                            id={field.id || field.name}
                            name={field.name}
                            value={field.input}
                            onChange={(e) => handleChange(e, field.onChange)}
                            required={field.required}
                        />
                    </div>
                );
            case 'input':
                return (
                    <Input
                        key={index}
                        type={'text'}
                        id={field.id || field.name}
                        name={field.name}
                        value={field.input}
                        inputRef={field.ref || null}
                        onChange={(e) => handleChange(e, field.onChange)}
                        onKeyDown={field.onKeyDown}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                    />
                );
            case 'button':
                return (
                    <Button
                        key={index}
                        id={field.id}
                        className={field.className || null}
                        type={field.type}
                        text={field.text}
                        onClick={field.onClick}
                        disabled={field.disabled}
                        showBtn={field.showBtn ?? true}
                    >
                        {field.child}
                    </Button>
                );
            case 'list':
                return (
                    <ul key={index}>
                        {field.list.map((listField, fkey) => (
                            <li key={fkey}>
                                {listField}
                                {field.listChildren.map((child, lkey) => (
                                    <Button
                                        key={lkey}
                                        type={child.childType}
                                        className='button deleteBtn'
                                        text={child.text}
                                        onClick={() => { child.onClick(fkey) }}
                                        showBtn={child.showBtn ?? true}
                                    />
                                ))}
                            </li>
                        ))}
                    </ul>
                );
            default: return false
        }
    }

    return (
        <form className={formClass} onSubmit={onSubmit}>

            {formFields.havingParent ? addParentToMapFields(formFields.fields) : mapFields(formFields)}

            {children}

            {Boolean(showSubmitBtn) &&
                <Button
                    type="submit"
                    className='button'
                    text={submitButton}
                    disabled={submitDisabled}
                    showBtn={true}
                />
            }
        </form>
    );
}

export default Form;
