import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "./authSlice";
import { useSignupMutation } from "../../api/apiSlice";

const SignupPage = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await signup({ name, email, password }).unwrap();
      dispatch(setCredentials({ token: result.token }));
      navigate("/");
    } catch (err) {
      setError((err.data && err.data.error) || err.error || "Signup failed!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Sign Up
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
