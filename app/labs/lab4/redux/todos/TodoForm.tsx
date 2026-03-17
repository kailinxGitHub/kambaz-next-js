"use client";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <li className="list-group-item">
      <div className="d-flex w-100">
        <input
          className="form-control"
          value={todo.title}
          onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        />
        <div className="ms-auto d-flex gap-2">
          <button
            onClick={() => dispatch(updateTodo(todo))}
            id="wd-update-todo-click"
            className="btn btn-warning"
          >
            Update
          </button>
          <button
            onClick={() => dispatch(addTodo(todo))}
            id="wd-add-todo-click"
            className="btn btn-success"
          >
            Add
          </button>
        </div>
      </div>
    </li>
  );
}
