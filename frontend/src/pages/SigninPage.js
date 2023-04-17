import React, { useState } from "react";
import "./../index.css";
import { useAuth } from "../auth/useAuth";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signin } = useAuth();

  const isValidForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(username, password);
  };

  return (
    <div className="login-panel shadow-8 p-fluid">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Masukkan username dan password anda</p>

        <div className="mb-2">
          <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </div>

        <div className="mb-2">
          <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} placeholder="Password" />
        </div>

        <div>
          <Button type="submit" disabled={!isValidForm()}>
            Sign In
          </Button>
          <br />
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;
