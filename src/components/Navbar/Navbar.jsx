import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import Input from '../Input/Input';
import Button from '../Button/Button';
import logo from '../../recipe.png';
import SearchIcon from '../SearchIcon';
import './Navbar.css';

const Navbar = () => {

    const { isAuth, logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchQuery = () => {
        setSearchQuery('');
        navigate(`/recipes-filter/${searchQuery}`);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchQuery();
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
                <Link to="/bad-day-mode">Mood-Boosting Meals</Link>
                <Link to="/mood-question">Emotion Eats</Link>
                <Link to="/available-ingredients">Kitchen Inventory</Link>
            </div>
            <div className="navbar-right">
                <div className='search-section'>
                    <Input
                        className="search-input"
                        type="text"
                        placeholder="search a recipe"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                    <Button type="submit" className="search" onClick={handleSearchQuery} showBtn={true}>
                        <SearchIcon />
                    </Button>
                </div>
                {isAuth ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <Link to="/" onClick={logout}>Log out</Link>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;