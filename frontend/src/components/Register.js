import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";

function Register({ onRegister }) {
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

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    onRegister(inputs);
    resetForm();
  };

  return (
    <>
      <Header>
        <Link
          to="/sign-in"
          className="header__menu-component header__menu-component_ent"
        >
          Войти
        </Link>
      </Header>
      <main>
        <div className="login">
          <h2 className="login__name">Регистрация</h2>
          <form className="login__form" onSubmit={handleRegisterSubmit}>
            <input
              className="login__input"
              placeholder="Email"
              name="email"
              type="email"
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
              Зарегистрироваться
            </button>
          </form>
          <p className="login__text">
            Уже зарегистрированы?{" "}
            <Link className="login__link" to="/sign-in">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Register;
