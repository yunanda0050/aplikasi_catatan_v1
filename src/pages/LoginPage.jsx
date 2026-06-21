// pages/LoginPage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../loginform/LoginForm";
import { login } from "../utils/network";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  async function onLogin({ username, password }) {
    const { error, data } = await login({ username, password });
    if (!error) {
      console.log(data, "onLogin");
      await onLoginSuccess({ accessToken: data.token });
    }
    // Handle error if needed
  }

  return (
    <section className="login-page">
      <h2>Silahkan masuk untuk melanjutkan ...</h2>
      <LoginForm onLoginSuccess={onLoginSuccess} login={onLogin} />
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  );
}

export { LoginPage };