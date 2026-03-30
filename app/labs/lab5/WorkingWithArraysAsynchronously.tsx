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

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("New Todo");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadTodos = async (completedOnly = showCompletedOnly) => {
    try {
      const todoList = await fetchTodos(completedOnly ? true : undefined);
      setTodos(todoList);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void (async () => {
        try {
          const todoList = await fetchTodos();
          setTodos(todoList);
          setErrorMessage("");
        } catch (error) {
          setErrorMessage(getErrorMessage(error));
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

  const handleEditKeyDown = async (event: KeyboardEvent<HTMLInputElement>, todo: Todo) => {
    if (event.key === "Enter") {
      await saveTodo({ ...todo, title: editedTitle });
    }
  };

  return (
    <div id="wd-lab5-arrays-async" className="mb-4">
      <h3>Working With Arrays Asynchronously</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="d-flex gap-2 mb-3 align-items-center">
        <FormControl
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="New todo title"
        />
        <button
          className="btn btn-success"
          onClick={() => void handleLegacyCreate()}
          title="Create with GET"
        >
          <FaPlusCircle />
        </button>
        <button
          className="btn btn-primary"
          onClick={() => void handlePostCreate()}
          title="Create with POST"
        >
          <FaPlusCircle />
        </button>
      </div>

      <div className="d-flex gap-3 mb-3">
        <button className="btn btn-secondary" onClick={() => void loadTodos(false)}>
          Load All Todos
        </button>
        <button className="btn btn-secondary" onClick={() => void toggleCompletedFilter()}>
          {showCompletedOnly ? "Show All Todos" : "Show Completed Todos"}
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex align-items-center gap-2"
          >
            <FormCheck
              checked={todo.completed}
              onChange={(e) =>
                void saveTodo({ ...todo, completed: e.target.checked })
              }
            />
            <div className="flex-grow-1">
              {editingTodoId === todo.id ? (
                <FormControl
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={() => void saveTodo({ ...todo, title: editedTitle })}
                  onKeyDown={(e) => void handleEditKeyDown(e, todo)}
                  autoFocus
                />
              ) : (
                <>
                  <div>{todo.title}</div>
                  <small className="text-muted">{todo.description}</small>
                </>
              )}
            </div>
            <button
              className="btn btn-warning"
              onClick={() => {
                setEditingTodoId(todo.id);
                setEditedTitle(todo.title);
              }}
              title="Edit with PUT"
            >
              <FaPencilAlt />
            </button>
            <button
              className="btn btn-danger"
              onClick={() => void handleLegacyDelete(todo.id)}
              title="Delete with GET"
            >
              <FaTrash />
            </button>
            <button
              className="btn btn-outline-danger"
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
