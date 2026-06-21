// loginform/LoginForm.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../src/utils/network"; // Updated import

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function onUsernameChangeHandler(event) {
    setUsername(event.target.value);
  }

  function onPasswordChangeHandler(event) {
    setPassword(event.target.value);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      const { error, data } = await login({ username, password });
      if (!error) {
        console.log(data, "onSubmitHandler");
        onLoginSuccess({ accessToken: data.token });
      } else {
        // Handle error and set the error state
        setError("Nama pengguna atau kata sandi salah");
        console.error("Failed to log in:", error);
      }
    } catch (error) {
      // Handle fetch error if needed
      setError("Terjadi kesalahan saat mencoba masuk. Silakan coba lagi.");
      console.error("Failed to log in:", error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="login-form">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={onUsernameChangeHandler}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChangeHandler}
        required
      />
      <button type="submit">Masuk</button>
    </form>
  );
}

LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export { LoginForm };