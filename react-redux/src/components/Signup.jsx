import React, { useState } from "react";
import { useSignupMutation } from "../api/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const Signup = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signup({ name, email, password }).unwrap();
      console.log(result);
      dispatch(setCredentials({ token: result.token }));
      alert("Signup successful!");
    } catch (err) {
      console.log("Err", err);
      alert("Signup failed!");
    }
  };

  return (
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
      {error && (
        <p style={{ color: "red" }}>
          Signup failed: {(error.data && error.data.error) || error.error}
        </p>
      )}
    </form>
  );
};

export default Signup;
