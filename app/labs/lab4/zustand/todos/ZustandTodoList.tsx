"use client";
import React from "react";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodoStore();
  
  return (
    <div id="wd-zustand-todo-list">
      <h2>Zustand Todo List</h2>
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
                id="wd-zustand-update-todo-click"
                className="btn btn-warning"
              >
                Update
              </button>
              <button
                onClick={() => addTodo(todo)}
                id="wd-zustand-add-todo-click"
                className="btn btn-success"
              >
                Add
              </button>
            </div>
          </div>
        </li>
        {todos.map((t) => (
          <li key={t.id} className="list-group-item d-flex w-100 align-items-center">
            <span>{t.title}</span>
            <div className="ms-auto d-flex gap-2">
              <button
                onClick={() => setTodo(t)}
                id="wd-zustand-set-todo-click"
                className="btn btn-primary"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(t.id)}
                id="wd-zustand-delete-todo-click"
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
