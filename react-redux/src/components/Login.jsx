import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../api/apiSlice";

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token: result.token }));
      alert("Login successful!");
    } catch {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      {error && (
        <p style={{ color: "red" }}>
          Login failed: {(error.data && error.data.error) || error.error}
        </p>
      )}
    </form>
  );
};

export default Login;
