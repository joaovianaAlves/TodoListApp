"use client";
import React, { useState } from "react";
import Search from "../components/Search";
import { FaCheck } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Page({ todos, removeTodo, completeTodo }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <h2 className="m-4">Completed Tasks</h2>
      <div className="overflow-auto max-h-[200px]">
        {todos && todos.length > 0 ? (
          todos
            .filter(
              (todo) =>
                todo.isCompleted &&
                todo.text.toLowerCase().includes(search.toLowerCase())
            )
            .map((todo) => (
              <div
                key={todo.id}
                className={` p-2 sm:p-4 mb-2 flex flex-col sm:flex-row  ${
                  todo.isCompleted ? "bg-gray-400 text-gray-200 rounded-md" : ""
                }`}
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "",
                }}
              >
                <div>
                  <p className="font-semibold">{todo.text}</p>
                  <p className="text-xs sm:text-sm">{todo.category}</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <button
                    onClick={() => completeTodo(todo.id)}
                    className={`bg-[#708090] rounded-md px-4 py-2 mr-2 hover:bg-[#778899]`}
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="bg-[#708090] rounded-md px-4 py-2 hover:bg-[#778899]"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p>No completed tasks found.</p>
        )}
      </div>
    </>
  );
}
