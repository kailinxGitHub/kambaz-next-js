"use client";
import React from "react";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos();
  return (
    <div id="wd-react-context-todo-list">
      <h2>Todo List Context</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <div className="d-flex w-100">
            <input
              className="form-control"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <div className="ms-auto d-flex gap-2">
              <button
                onClick={() => updateTodo(todo)}
                id="wd-context-update-todo-click"
                className="btn btn-warning"
              >
                Update
              </button>
              <button
                onClick={() => addTodo(todo)}
                id="wd-context-add-todo-click"
                className="btn btn-success"
              >
                Add
              </button>
            </div>
          </div>
        </li>
        {todos.map((t: any) => (
          <li key={t.id} className="list-group-item d-flex w-100 align-items-center">
            <span>{t.title}</span>
            <div className="ms-auto d-flex gap-2">
              <button
                onClick={() => setTodo(t)}
                id="wd-context-set-todo-click"
                className="btn btn-primary"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(t.id)}
                id="wd-context-delete-todo-click"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
