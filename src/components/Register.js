import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Register({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSignup(email, password);
  }

  return (
    <section className="section">
      <h2 className="section__header">Регистрация</h2>
      <form className="section__form" onSubmit={handleSubmit}>
        <input
          className="section__input"
          autoComplete="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
        />
        <input
          className="section__input"
          autoComplete="new-password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Пароль"
        />
        <button className="section__btn opacity-on-hover" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="section__question">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="section__link opacity-on-hover">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
