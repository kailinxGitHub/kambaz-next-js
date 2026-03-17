"use client";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();

  return (
    <li className="list-group-item">
      <div className="d-flex w-100 align-items-center">
        <span>{todo.title}</span>
        <div className="ms-auto d-flex gap-2">
          <button
            onClick={() => dispatch(setTodo(todo))}
            id="wd-set-todo-click"
            className="btn btn-primary"
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
            id="wd-delete-todo-click"
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
