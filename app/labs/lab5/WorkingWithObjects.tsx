"use client";

import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "./client";

export default function WorkingWithObjects() {
  const [title, setTitle] = useState("New Assignment Title");
  const [score, setScore] = useState("95");
  const [completed, setCompleted] = useState(true);
  const [moduleName, setModuleName] = useState("Application Servers");
  const [moduleDescription, setModuleDescription] = useState(
    "Working with remote objects"
  );

  return (
    <div id="wd-lab5-working-with-objects" className="mb-4">
      <h3>Working With Objects</h3>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/assignment`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Assignment
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/assignment/title`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Assignment Title
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/assignment/score`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Assignment Score
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/assignment/completed`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Assignment Completed
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/module`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Module
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/module/name`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Module Name
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${HTTP_SERVER}/lab5/module/description`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Module Description
          </a>
        </li>
      </ul>

      <FormControl
        className="mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Assignment title"
      />
      <a
        href={`${HTTP_SERVER}/lab5/assignment/title/${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Assignment Title
      </a>

      <FormControl
        className="my-2"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Assignment score"
      />
      <a
        href={`${HTTP_SERVER}/lab5/assignment/score/${score}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Assignment Score
      </a>

      <FormCheck
        className="my-2"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
        label="Assignment Completed"
      />
      <a
        href={`${HTTP_SERVER}/lab5/assignment/completed/${completed}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Assignment Completed
      </a>

      <FormControl
        className="my-2"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        placeholder="Module name"
      />
      <a
        href={`${HTTP_SERVER}/lab5/module/name/${encodeURIComponent(moduleName)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Module Name
      </a>

      <FormControl
        className="my-2"
        value={moduleDescription}
        onChange={(e) => setModuleDescription(e.target.value)}
        placeholder="Module description"
      />
      <a
        href={`${HTTP_SERVER}/lab5/module/description/${encodeURIComponent(
          moduleDescription
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}
