import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoList from "./features/todos/TodoList";
import AddTodo from "./features/todos/AddTodo";
import { logOut } from "./features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(apiSlice.util.resetApiState());
    navigate("/login");
  };

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
