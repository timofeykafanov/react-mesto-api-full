import logo from '../images/logo.svg';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header(props) {
    const location = useLocation();
    const [link, setLink] = useState('');

    useEffect(() => {
        if (location.pathname === '/sign-in') return setLink('Регистрация');
        if (location.pathname === '/sign-up') return setLink('Войти');
    }, [location])

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
            <Routes>
                <Route path="/" element={
                    <div className="header__data">
                        <p className="header__email">{props.email}</p>
                        <button className="header__link header__link_type_logout" onClick={props.handleLogout}>Выйти</button>
                    </div>
                } />
                <Route path="sign-in" element={<Link className="header__link" to="/sign-up">{link}</Link>} />
                <Route path="sign-up" element={<Link className="header__link" to="/sign-in">{link}</Link>} />
            </Routes>
        </header>
    )
}

export default Header;