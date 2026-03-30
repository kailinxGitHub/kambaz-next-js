"use client";

import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "./client";

export default function WorkingWithArrays() {
  const [todoId, setTodoId] = useState("2");
  const [title, setTitle] = useState("Updated Todo Title");
  const [description, setDescription] = useState("Updated todo description");
  const [completed, setCompleted] = useState(true);

  return (
    <div id="wd-lab5-working-with-arrays" className="mb-4">
      <h3>Working With Arrays</h3>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <a href={`${HTTP_SERVER}/lab5/todos`} target="_blank" rel="noopener noreferrer">
            Get Todos
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/todos?completed=true`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Completed Todos
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/todos/create`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Create Todo
          </a>
        </li>
      </ul>

      <FormControl
        className="mb-2"
        value={todoId}
        onChange={(e) => setTodoId(e.target.value)}
        placeholder="Todo ID"
      />
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/todos/${todoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Todo by ID
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/todos/${todoId}/delete`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Delete Todo
          </a>
        </li>
      </ul>

      <FormControl
        className="mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title"
      />
      <a
        href={`${HTTP_SERVER}/lab5/todos/${todoId}/title/${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Todo Title
      </a>

      <FormCheck
        className="my-2"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
        label="Todo Completed"
      />
      <a
        href={`${HTTP_SERVER}/lab5/todos/${todoId}/completed/${completed}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Todo Completed
      </a>

      <FormControl
        className="my-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Todo description"
      />
      <a
        href={`${HTTP_SERVER}/lab5/todos/${todoId}/description/${encodeURIComponent(
          description
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Todo Description
      </a>
      <hr />
    </div>
  );
}
