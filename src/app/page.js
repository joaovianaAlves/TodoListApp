"use client";
import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { Preferences } from "@capacitor/preferences";

export default function Home() {
  const get = async () => {
    const { value } = await Preferences.get({ key: "todos" });
    return value ? JSON.parse(value) : [];
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const initialTodos = await get();
      setTodos(initialTodos);
    };

    fetchTodos();
  }, [setTodos]);

  const save = async (todos) => {
    await Preferences.set({ key: "todos", value: JSON.stringify(todos) });
  };

  useEffect(() => {
    save(todos);
  }, [todos]);

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      { text, category, id: todos.length + 1, isCompleted: false },
    ];
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos.filter((todo) => todo.id !== id)];
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="mx-auto min-h-screen sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl flex flex-col bg-[#2F4F4F] text-[#F5F5F5]">
      <div className="flex-grow">
        <TodoList
          todos={todos}
          removeTodo={removeTodo}
          completeTodo={completeTodo}
        />
      </div>
      <div className="mt-auto">
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
