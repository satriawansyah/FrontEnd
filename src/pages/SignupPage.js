import React, { useState } from "react";
import "./../index.css";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { APP_BASE_URL } from "../configs/constants";
import { Link, useNavigate } from "react-router-dom";
import { Message } from "primereact/message";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const isValidForm = () => {
    return username.length > 0 && password.length > 0 && nama.length > 0 && email.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${APP_BASE_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          email,
          nama,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setError(true);
        const data = await response.json();
        setErrorMessage(`${data.message}`);
        return;
      }

      const data = await response.json();
      console.log(data);
      navigate("/signin");
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage(error);
    }
  };

  return (
    <div className="login-panel shadow-8 p-fluid">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <p>Masukkan username dan password anda</p>

        {error && <Message severity="error" text={errorMessage} />}

        <div className="mb-2">
          <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </div>

        <div className="mb-2">
          <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} placeholder="Password" />
        </div>

        <div className="mb-2">
          <InputText value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama" />
        </div>

        <div className="mb-2">
          <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </div>

        <div>
          <Button type="submit" disabled={!isValidForm()}>
            Sign Up
          </Button>
          <br />
          <Link to="/signin">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
