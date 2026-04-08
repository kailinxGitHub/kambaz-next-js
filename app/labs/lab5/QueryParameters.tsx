"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "./client";

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div id="wd-query-parameters" className="mb-4">
      <h3>Query Parameters</h3>
      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        placeholder="Enter value for a"
      />
      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        placeholder="Enter value for b"
      />
      <div className="d-flex flex-wrap gap-2 mb-2">
        <a
          id="wd-query-parameter-add"
          href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary"
        >
          Add {a} + {b}
        </a>
        <a
          id="wd-query-parameter-subtract"
          href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-danger"
        >
          Subtract {a} - {b}
        </a>
        <a
          id="wd-query-parameter-multiply"
          href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-success"
        >
          Multiply {a} × {b}
        </a>
        <a
          id="wd-query-parameter-divide"
          href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-warning"
        >
          Divide {a} ÷ {b}
        </a>
      </div>
      <hr />
    </div>
  );
}
