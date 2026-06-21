// pages/RegisterPage.js
import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { RegisterForm } from "../../Register/RegisterForm";
import { register } from "../utils/network";
import { login } from "../utils/network";

function RegisterPage({ onRegisterSuccess }) {
    const navigate = useNavigate();

    async function onRegister({ username, password }) {
        try {
            const { error, data } = await register({ username, password });
            if (!error) {
                console.log(data, "onRegister");

                const loginResponse = await login({ username, password });
                if (!loginResponse.error) {
                    await onRegisterSuccess({ accessToken: loginResponse.data.token });

                    showNotification(
                        "Registrasi berhasil! Anda akan diarahkan ke halaman login.",
                        "success"
                    );
                } else {
                    // Handle login error if needed
                }
            } else {
                showNotification("Registrasi gagal. Silakan coba lagi.", "error");
            }
        } catch (error) {
            console.error("Failed to register:", error);
        }
    }

    function showNotification(message, type) {
        alert(message);
    }

    return (
        <section className="register-page">
            <h2>Daftar untuk membuat akun ...</h2>
            <RegisterForm onRegisterSuccess={onRegisterSuccess} onRegister={onRegister} navigate={navigate} />
            <p>
                Sudah punya akun? <Link to="/">Masuk di sini</Link>
            </p>
        </section>
    );
}

RegisterPage.propTypes = {
    onRegisterSuccess: PropTypes.func.isRequired,
};

export { RegisterPage };