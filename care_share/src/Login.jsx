// src/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect to home
    } catch (error) {
      alert(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="block my-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="block my-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginWithEmail}>Login</button>
      <button onClick={loginWithGoogle} className="ml-2">Login with Google</button>
    </div>
  );
};

export default Login;
