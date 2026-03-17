import React from "react";
import { CounterProvider } from "./counter/context";
import ReactContextCounter from "./counter/index";
import { TodosProvider } from "./todos/todosContext";
import ReactContextTodoList from "./todos/ReactContextTodoList";

export default function ReactContextExamples() {
  return (
    <div id="wd-react-context-examples">
      <h2>React Context Examples</h2>
      <CounterProvider>
        <ReactContextCounter />
      </CounterProvider>
      <TodosProvider>
        <ReactContextTodoList />
      </TodosProvider>
    </div>
  );
}
