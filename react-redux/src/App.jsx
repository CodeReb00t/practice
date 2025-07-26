import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { logOut } from "./features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = React.useState(true);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(apiSlice.util.resetApiState());
  };

  if (!token) {
    return (
      <div>
        <h1>RTK Query To-Do App - Please Sign In</h1>
        {showLogin ? (
          <>
            <Login />
            <p>
              Don't have an account?{" "}
              <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </p>
          </>
        ) : (
          <>
            <Signup />
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowLogin(true)}>Login</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>RTK Query To-Do App</h1>
      <button onClick={handleLogout}>Logout</button>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
