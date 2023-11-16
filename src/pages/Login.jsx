import React, { useState } from "react";
import Form from "../components/Form/Form";

const Login = () => {

    const [logUsername, setLogUsername] = useState('');
    const [logPassword, setLogPassword] = useState('');

    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    const loginFormFields = [
        { fieldType: 'label-input', name: 'username', label: 'Username', input: logUsername,  onChange: setLogUsername, required: true },
        { fieldType: 'label-input', name: 'password', type: 'password', label: 'Password', input: logPassword,  onChange: setLogPassword, required: true },
    ];

    const registerFormFields = [
        { fieldType: 'label-input', name: 'username', label: 'Username', input: regUsername,  onChange: setRegUsername, required: true },
        { fieldType: 'label-input', name: 'email', label: 'Email Address', input: regEmail,  onChange: setRegEmail, required: true },
        { fieldType: 'label-input', name: 'password', type: 'password', label: 'Password', input: regPassword,  onChange: setRegPassword, required: true },
    ];

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(logUsername, logPassword);
    }

    const onRegister = (e) => {
        e.preventDefault();
        console.log(regUsername, regEmail, regPassword);
    }

    return (
        <div className="container">
            <div className="form-component">
                <h2 className="form-heading">Login</h2>
                <Form fields={loginFormFields} submitButton="Login"  onSubmit={onSubmit} />
            </div>

            <div className="form-component">
                <h2 className="form-heading">User Registration</h2>
                <Form fields={registerFormFields} submitButton="Register" onSubmit={onRegister} />
            </div>
        </div>
    );
}

export default Login;