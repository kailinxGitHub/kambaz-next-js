"use client";
import React from "react";
import { useCounter } from "./context";

export default function ReactContextCounter() {
  const { count, setCount } = useCounter();
  return (
    <div id="wd-react-context-counter">
      <h2>Context Counter</h2>
      <h3>{count}</h3>
      <button
        onClick={() => setCount(count + 1)}
        className="btn btn-success"
        id="wd-context-counter-increment-click"
      >
        Increment
      </button>
      <button
        onClick={() => setCount(count - 1)}
        className="btn btn-danger"
        id="wd-context-counter-decrement-click"
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}
