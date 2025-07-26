import React from "react";
import { useSelector } from "react-redux";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../api/apiSlice";

const TodoList = () => {
  const token = useSelector((state) => state.auth.token);
  const {
    data: todos,
    error,
    isLoading,
  } = useGetTodosQuery(undefined, { skip: !token });

  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();

  if (!token) return <p>Please log in to see your todos.</p>;
  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <ul>
      {todos?.length ? (
        todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} {todo.completed ? "Completed" : "Not Completed"}{" "}
            <button onClick={() => deleteTodo(todo._id)} disabled={isDeleting}>
              Delete
            </button>
            <button
              onClick={() =>
                updateTodo({ id: todo._id, completed: !todo.completed })
              }
              disabled={isUpdating}
            >
              ToggleComplete
            </button>
          </li>
        ))
      ) : (
        <p>No todos found.</p>
      )}
    </ul>
  );
};

export default TodoList;
