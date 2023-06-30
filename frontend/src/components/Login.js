import { Link } from "react-router-dom";
import { useState } from "react";

import Header from "./Header";

function Login({ onLogin }) {
  const defaultValues = {
    email: "",
    password: "",
  };
  const [inputs, setInputs] = useState(defaultValues);

  const handleChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setInputs((state) => ({ ...state, [name]: value }));
  };
  const resetForm = () => {
    setInputs({ ...defaultValues });
  };

  const handleAuthorizeSubmit = (evt) => {
    evt.preventDefault();
    onLogin(inputs);
    resetForm();
  };

  return (
    <>
      <Header>
        <Link
          to="/sign-up"
          className="header__menu-component header__menu-component_ent"
        >
          Регистрация
        </Link>
      </Header>

      <main>
        <div className="login">
          <h2 className="login__name">Вход</h2>
          <form className="login__form" onSubmit={handleAuthorizeSubmit}>
            <input
              type="email"
              className="login__input"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              className="login__input"
              placeholder="Пароль"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
            />
            <button className="login__save-button" type="submit">
              Войти
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
