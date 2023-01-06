import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/Auth/authChecker';

const Home = (props) => {
    const [isLogin, setIsLogin] = useState(false)
    const handleLogout = () => {
        logout();
        setIsLogin(false);
    }

    return (
        <div>
            <h1>Home</h1>
            {isLogin ? 
                <button onClick={() => handleLogout()}>Click here to log out</button>
                : <Link to="/signin">Go to sign in page</Link>
            }
        </div>
    );
};

export default Home;