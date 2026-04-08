"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { FaPencilAlt, FaPlusCircle, FaTrash } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FormCheck, FormControl } from "react-bootstrap";
import {
  Todo,
  createNewTodo,
  deleteTodo,
  fetchTodos,
  getErrorMessage,
  postNewTodo,
  removeTodo,
  updateTodo,
} from "./client";

type LoadStatus = "loading" | "idle";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
  const [newTodoTitle, setNewTodoTitle] = useState("New Todo");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadTodos = async (completedOnly = showCompletedOnly) => {
    setLoadStatus("loading");
    try {
      const todoList = await fetchTodos(completedOnly ? true : undefined);
      setTodos(todoList);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoadStatus("idle");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void (async () => {
        setLoadStatus("loading");
        try {
          const todoList = await fetchTodos();
          setTodos(todoList);
          setErrorMessage("");
        } catch (error) {
          setErrorMessage(getErrorMessage(error));
        } finally {
          setLoadStatus("idle");
        }
      })();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleCompletedFilter = async () => {
    const nextValue = !showCompletedOnly;
    setShowCompletedOnly(nextValue);
    await loadTodos(nextValue);
  };

  const handleLegacyCreate = async () => {
    try {
      setTodos(await createNewTodo());
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handlePostCreate = async () => {
    try {
      const createdTodo = await postNewTodo({
        title: newTodoTitle,
        description: `${newTodoTitle} description`,
        completed: false,
      });
      setTodos((current) => [...current, createdTodo]);
      setNewTodoTitle("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleLegacyDelete = async (todoId: number) => {
    try {
      setTodos(await removeTodo(todoId));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleDelete = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos((current) => current.filter((todo) => todo.id !== todoId));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const saveTodo = async (todo: Todo) => {
    try {
      await updateTodo(todo);
      setTodos((current) =>
        current.map((item) => (item.id === todo.id ? todo : item))
      );
      setEditingTodoId(null);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleEditKeyDown = async (event: KeyboardEvent<HTMLElement>, todo: Todo) => {
    if (event.key === "Enter") {
      await saveTodo({ ...todo, title: editedTitle });
    }
  };

  const showEmptyList = loadStatus === "idle" && todos.length === 0 && !errorMessage;

  return (
    <div id="wd-asynchronous-arrays" className="mb-4">
      <h3>Working With Arrays Asynchronously</h3>
      {errorMessage && <div id="wd-todo-error-message" className="alert alert-danger">{errorMessage}</div>}
      <div className="d-flex gap-2 mb-3 align-items-center">
        <FormControl
          id="wd-new-todo-title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="New todo title"
        />
        <button
          id="wd-create-todo"
          className="btn btn-success"
          onClick={() => void handleLegacyCreate()}
          title="Create with GET"
          type="button"
        >
          <FaPlusCircle />
        </button>
        <button
          id="wd-post-todo"
          className="btn btn-primary"
          onClick={() => void handlePostCreate()}
          title="Create with POST"
          type="button"
        >
          <FaPlusCircle />
        </button>
      </div>

      <div className="d-flex gap-3 mb-3">
        <button
          id="wd-load-all-todos"
          className="btn btn-secondary"
          type="button"
          onClick={() => void loadTodos(false)}
        >
          Load All Todos
        </button>
        <button
          id="wd-toggle-completed-todos"
          className="btn btn-secondary"
          type="button"
          onClick={() => void toggleCompletedFilter()}
        >
          {showCompletedOnly ? "Show All Todos" : "Show Completed Todos"}
        </button>
      </div>

      {loadStatus === "loading" && (
        <p id="wd-async-todos-loading" className="text-muted">
          Loading todos…
        </p>
      )}

      {showEmptyList && (
        <p id="wd-async-todos-empty" className="text-muted">
          No todos.
        </p>
      )}

      <ul id="wd-async-todos-list" className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex align-items-center gap-2"
          >
            <FormCheck
              id={`wd-todo-completed-${todo.id}`}
              checked={todo.completed}
              onChange={(e) =>
                void saveTodo({ ...todo, completed: e.target.checked })
              }
            />
            <div className="grow">
              {editingTodoId === todo.id ? (
                <FormControl
                  id={`wd-put-todo-title-${todo.id}`}
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={() => void saveTodo({ ...todo, title: editedTitle })}
                  onKeyDown={(e) => void handleEditKeyDown(e, todo)}
                  autoFocus
                />
              ) : (
                <>
                  <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.title}</span>
                  <small className="text-muted d-block">{todo.description}</small>
                </>
              )}
            </div>
            <button
              id="wd-put-todo"
              className="btn btn-warning"
              type="button"
              onClick={() => {
                setEditingTodoId(todo.id);
                setEditedTitle(todo.title);
              }}
              title="Edit with PUT"
            >
              <FaPencilAlt />
            </button>
            <button
              id="wd-remove-todo"
              className="btn btn-danger"
              type="button"
              onClick={() => void handleLegacyDelete(todo.id)}
              title="Delete with GET"
            >
              <FaTrash />
            </button>
            <button
              id="wd-delete-todo"
              className="btn btn-outline-danger"
              type="button"
              onClick={() => void handleDelete(todo.id)}
              title="Delete with DELETE"
            >
              <TiDelete className="fs-4" />
            </button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
