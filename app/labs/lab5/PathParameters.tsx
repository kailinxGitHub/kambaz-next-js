"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "./client";

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div id="wd-lab5-path-parameters" className="mb-4">
      <h3>Path Parameters</h3>
      <FormControl
        id="wd-path-parameter-a"
        className="mb-2"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        placeholder="Enter value for a"
      />
      <FormControl
        id="wd-path-parameter-b"
        className="mb-2"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        placeholder="Enter value for b"
      />
      <div className="d-flex flex-wrap gap-2 mb-2">
        <a
          id="wd-path-parameter-add"
          className="btn btn-primary"
          href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add {a} + {b}
        </a>
        <a
          id="wd-path-parameter-subtract"
          className="btn btn-danger"
          href={`${HTTP_SERVER}/lab5/subtract/${a}/${b}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Subtract {a} - {b}
        </a>
        <a
          id="wd-path-parameter-multiply"
          className="btn btn-success"
          href={`${HTTP_SERVER}/lab5/multiply/${a}/${b}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Multiply {a} × {b}
        </a>
        <a
          id="wd-path-parameter-divide"
          className="btn btn-warning"
          href={`${HTTP_SERVER}/lab5/divide/${a}/${b}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Divide {a} ÷ {b}
        </a>
      </div>
      <hr />
    </div>
  );
}
