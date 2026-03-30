"use client";

import { useMemo, useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "./client";

export default function QueryParameters() {
  const [a, setA] = useState("57");
  const [b, setB] = useState("11");

  const links = useMemo(
    () => [
      {
        id: "wd-query-parameter-add-link",
        label: "Add",
        href: `${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`,
      },
      {
        id: "wd-query-parameter-subtract-link",
        label: "Subtract",
        href: `${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`,
      },
      {
        id: "wd-query-parameter-multiply-link",
        label: "Multiply",
        href: `${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`,
      },
      {
        id: "wd-query-parameter-divide-link",
        label: "Divide",
        href: `${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`,
      },
    ],
    [a, b]
  );

  return (
    <div id="wd-lab5-query-parameters" className="mb-4">
      <h3>Query Parameters</h3>
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
          <li key={link.id} className="list-group-item">
            <a id={link.id} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
