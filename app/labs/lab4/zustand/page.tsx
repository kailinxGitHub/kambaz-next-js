import React from "react";
import ZustandCounter from "./counter";
import ZustandTodoList from "./todos/ZustandTodoList";

export default function ZustandExamples() {
  return (
    <div id="wd-zustand-examples">
      <h2>Zustand Examples</h2>
      <ZustandCounter />
      <ZustandTodoList />
    </div>
  );
}
