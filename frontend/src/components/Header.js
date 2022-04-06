import logo from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header(props) {
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
                <Route path="sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
                <Route path="sign-up" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
            </Routes>
        </header>
    )
}

export default Header;