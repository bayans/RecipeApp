import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import isTokenValid from '../utils/isTokenValid';

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [logError, toggleLogError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = () => localStorage.getItem("jwtToken");

    setIsAuth(isTokenValid(getToken()));
  }, []);

  const handleLogin = (token) => {
    setIsAuth(true);
    localStorage.setItem('jwtToken', token);
    navigate('/');
  };

  function login(username, password) {    
    toggleLogError(false);

    axios.post(
      "https://frontend-educational-backend.herokuapp.com/api/auth/signin",
      { username, password }
    )
      .then(resp => resp.data)
      .then(data => {
        handleLogin(data.accessToken);
      })
      .catch(error => {
        if (error.response.status === 401) {
          toggleLogError("Wrong username or password!")
        } else {
          toggleLogError("Something wrong happened, please try later!")
        }
      });
  }

  function logout() {
    setIsAuth(false);
    localStorage.removeItem('jwtToken');
  }

  const data = {
    isAuth: isAuth,
    logError: logError,
    logout: logout,
    login: login
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;