"use client";
import React, { useState } from "react";
import Search from "./Search";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "../utils/AuthContext";
import Login from "./Login";

export default function TodoList({ todos, removeTodo, completeTodo }) {
  const [search, setSearch] = useState("");
  const { user, logOut } = useAuth();

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
                        className={`bg-[#708090] rounded-md px-2 py-1 mr-1 hover:bg-[#778899]`}
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
