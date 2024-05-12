import React from 'react';
import Login from '../components/login/Login';
import Header from '../components/header/Header';

function LoginPage(props) {
    return (
        <div>
            <Header></Header>
            <Login></Login>
        </div>
    );
}

export default LoginPage;