"use client";

import { useMemo, useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "./client";

export default function PathParameters() {
  const [a, setA] = useState("6");
  const [b, setB] = useState("4");

  const links = useMemo(
    () => [
      { label: "Add", href: `${HTTP_SERVER}/lab5/add/${a}/${b}` },
      { label: "Subtract", href: `${HTTP_SERVER}/lab5/subtract/${a}/${b}` },
      { label: "Multiply", href: `${HTTP_SERVER}/lab5/multiply/${a}/${b}` },
      { label: "Divide", href: `${HTTP_SERVER}/lab5/divide/${a}/${b}` },
    ],
    [a, b]
  );

  return (
    <div id="wd-lab5-path-parameters" className="mb-4">
      <h3>Path Parameters</h3>
      <FormControl
        className="mb-2"
        value={a}
        onChange={(e) => setA(e.target.value)}
        placeholder="Enter value for a"
      />
      <FormControl
        className="mb-2"
        value={b}
        onChange={(e) => setB(e.target.value)}
        placeholder="Enter value for b"
      />
      <ul className="list-group">
        {links.map((link) => (
          <li key={link.label} className="list-group-item">
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
