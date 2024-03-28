"use client";
import React, { useState, useEffect } from "react";
import Search from "./Search";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "../utils/AuthContext";
import Login from "./Login";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const { user, logOut } = useAuth();

  const completeTodo = async (id) => {
    if (db && user && user.uid) {
      const todoRef = doc(db, user.uid, id);
      const todoSnapshot = await getDoc(todoRef);
      const todoData = todoSnapshot.data();
      const newIsCompleted = !todoData.isCompleted;
      await updateDoc(todoRef, { isCompleted: newIsCompleted });
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: newIsCompleted };
        } else {
          return todo;
        }
      });
      setTodos(updatedTodos);
    }
  };

  const removeTodo = async (id) => {
    if (db && user && user.uid) {
      const todoRef = doc(db, user.uid, id);
      await deleteDoc(todoRef);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        const todoCollection = collection(db, user.uid);
        const todoSnapshot = await getDocs(todoCollection);
        const todoList = todoSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(todoList); // log the fetched todos
        setTodos(todoList);
      }
    };

    fetchTodos();
  }, [user]);

  const handleLogout = () => {
    logOut();
  };

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div>
          <button onClick={handleLogout}>Sign Out</button>
          <Search search={search} setSearch={setSearch} />
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-2">Lista de Tarefas</h1>
            <div className="overflow-auto h-[150px] overflow-y-auto">
              {todos
                .filter(
                  (todo) =>
                    !todo.isCompleted &&
                    todo.text.toLowerCase().includes(search.toLowerCase())
                )
                .map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-1 sm:p-2 mb-1 flex flex-row justify-between rounded-md items-center bg-[#696969] `}
                  >
                    <div>
                      <p className="text-sm sm:text-base font-semibold">
                        {todo.text}
                      </p>{" "}
                      <p className="text-xs">{todo.category}</p>
                    </div>
                    <div>
                      {" "}
                      <button
                        onClick={() => completeTodo(todo.id)}
                        className={`bg-[#708090] rounded-md px-2 py-1 mr-1 hover:bg-[#778899] `}
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => removeTodo(todo.id)}
                        className="bg-[#708090] rounded-md px-2 py-1 hover:bg-[#778899]"
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <h2 className="m-4">Completed Tasks</h2>
            <div className="overflow-auto h-[150px] overflow-y-auto">
              {todos
                .filter(
                  (todo) =>
                    todo.isCompleted &&
                    todo.text.toLowerCase().includes(search.toLowerCase())
                )
                .map((todo) => (
                  <div
                    key={todo.id}
                    className={` p-1 sm:p-2 mb-1 flex flex-row justify-between items-center ${
                      todo.isCompleted
                        ? "bg-gray-400 text-gray-200 rounded-md"
                        : ""
                    }`} // Changed flex direction to row
                    style={{
                      textDecoration: todo.isCompleted ? "line-through" : "",
                    }}
                  >
                    <div>
                      <p className="text-sm sm:text-base font-semibold">
                        {todo.text}
                      </p>{" "}
                      <p className="text-xs">{todo.category}</p>
                    </div>
                    <div>
                      {" "}
                      <button
                        onClick={() => completeTodo(todo.id)}
                        className={`bg-[#708090] rounded-md px-2 py-1 mr-1 hover:bg-[#778899] `}
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => removeTodo(todo.id)}
                        className="bg-[#708090] rounded-md px-2 py-1 hover:bg-[#778899]"
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
