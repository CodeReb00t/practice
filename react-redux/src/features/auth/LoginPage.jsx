import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "../../api/apiSlice";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token: result.token }));
      navigate("/");
    } catch (err) {
      setError((err.data && err.data.error) || err.error || "Login failed!");
    }
  };

  return (
    <div>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
