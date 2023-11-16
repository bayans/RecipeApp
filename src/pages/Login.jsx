import React, { useState } from "react";
import Form from "../components/Form/Form";

const Login = () => {

    const [logUsername, setLogUsername] = useState('');
    const [logPassword, setLogPassword] = useState('');

    const loginFormFields = [
        { fieldType: 'label-input', name: 'username', label: 'Username', input: logUsername,  onChange: setLogUsername, required: true },
        { fieldType: 'label-input', name: 'password', type: 'password', label: 'Password', input: logPassword,  onChange: setLogPassword, required: true },
    ];

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(logUsername, logPassword);
    }

    return (
        <div className="container">
            <div className="form-component">
                <h2 className="form-heading">Login</h2>
                <Form fields={loginFormFields} submitButton="Login"  onSubmit={onSubmit} />
            </div>
        </div>
    );
}

export default Login;