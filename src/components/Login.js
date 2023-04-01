import { useState } from 'react';

function Login({ onSignin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSignin(email, password);
  }

  return (
    <section className="section">
      <h2 className="section__header">Вход</h2>
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
          autoComplete="current-password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Пароль"
        />
        <button className="section__btn opacity-on-hover" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
