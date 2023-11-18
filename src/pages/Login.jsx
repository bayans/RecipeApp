import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import isPasswordValid from "../utils/isPasswordValid";
import Form from "../components/Form/Form";

const Login = () => {
    const { login, logError } = useContext(AuthContext);
    const [loading, toggleLoading] = useState(false);
    const [regError, toggleRegError] = useState(false);

    const [logUsername, setLogUsername] = useState('');
    const [logPassword, setLogPassword] = useState('');

    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    const loginFormFields = [
        { fieldType: 'label-input', name: 'username', label: 'Username', input: logUsername, onChange: setLogUsername, required: true },
        { fieldType: 'label-input', name: 'password', type: 'password', label: 'Password', input: logPassword, onChange: setLogPassword, required: true },
    ];

    const registerFormFields = [
        { fieldType: 'label-input', name: 'username', label: 'Username', input: regUsername, onChange: setRegUsername, required: true },
        { fieldType: 'label-input', name: 'email', label: 'Email Address', input: regEmail, onChange: setRegEmail, required: true },
        { fieldType: 'label-input', name: 'password', type: 'password', label: 'Password', input: regPassword, onChange: setRegPassword, required: true },
    ];

    const loginHandler = (e) => {
        e.preventDefault();
        login(logUsername, logPassword);
    }

    const registerHandler = (e) => {
        e.preventDefault();

        toggleRegError(false);

        if (!isPasswordValid(regPassword)) {
            toggleRegError("Password does not meet complexity criteria e.g. @A123456");
            return;
        }

        toggleLoading(true);

        axios.post(
            "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
            {
                username: regUsername,
                email: regEmail,
                password: regPassword,
                role: ["user"]
            }
        )
            .then(resp => resp.data.message)
            .then(message => {
                setRegUsername('');
                setRegEmail('');
                setRegPassword('');
                toggleLoading(false);
                alert(message);
            })
            .catch(error => {
                toggleRegError(error.response.data.message);
                toggleLoading(false);
            });
    }


    return (
        <div className="container">
            <div className="form-component">
                <h2 className="form-heading">Login</h2>
                {logError && <h4 className="error">{logError}</h4>}
                <Form formFields={loginFormFields} submitButton="Login" onSubmit={loginHandler} />
            </div>

            <div className="form-component">
                <h2 className="form-heading">User Registration</h2>
                {regError && <h4 className="error">{regError}</h4>}
                {loading &&
                    <div className="overlay-contaniner">
                        <div className="overlay">
                            <div className="loader"></div>
                        </div>
                    </div>
                }
                <Form formFields={registerFormFields} submitButton="Register" onSubmit={registerHandler} />
            </div>
        </div>
    );
}

export default Login;