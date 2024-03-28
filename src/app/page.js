"use client";
import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { Preferences } from "@capacitor/preferences";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./utils/firebase";
import { useAuth } from "./utils/AuthContext";

export default function Home() {
  const { user } = useAuth();

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

  const addTodo = async (text, category, isCompleted) => {
    const docRef = await addDoc(collection(db, user.uid), {
      text: text,
      category: category,
      isCompleted: false,
    });

    const newTodo = {
      id: docRef.id,
      text: text,
      category: category,
      isCompleted: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div className="mx-auto min-h-screen sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl flex flex-col bg-[#2F4F4F] text-[#F5F5F5]">
      <div className="flex-grow">
        <TodoList />
      </div>
      <div className="mt-auto">
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
