"use client";
import React, { createContext, useContext, useState } from "react";

const TodosContext = createContext<any>(null);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState({ title: "" });

  const addTodo = (todo: any) => {
    setTodos([
      ...todos,
      { ...todo, id: new Date().getTime().toString() },
    ]);
    setTodo({ title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = (todo: any) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    setTodo({ title: "" });
  };

  return (
    <TodosContext.Provider
      value={{ todos, todo, setTodo, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => useContext(TodosContext);
