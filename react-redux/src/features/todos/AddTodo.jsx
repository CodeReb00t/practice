import React, { useState } from "react";
import { useAddTodoMutation } from "../../api/apiSlice";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      await addTodo({
        title,
        completed: false,
      });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
