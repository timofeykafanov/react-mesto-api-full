import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({handleRegistration}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value)
        } else if (e.target.name === "password") {
            setPassword(e.target.value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegistration(email, password);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__heading">Регистрация</h2>
            <input className="form__input" type="email" name="email" value={email} placeholder="Email" onChange={handleChange}></input>
            <input className="form__input" type="password" name="password" value={password} placeholder="Пароль" onChange={handleChange}></input>
            <button className="form__button" type="submit">Зарегистрироваться</button>
            <p className="form__text">Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link></p>
        </form>
    )
}

export default Register;