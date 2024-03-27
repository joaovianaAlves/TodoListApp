"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import Create from "./Create";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createPage, setCreatePage] = useState(false);
  const [message, setMessage] = useState("");

  const changePage = async () => {
    setCreatePage(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setMessage("Login successfully!");
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/invalid-credential":
            setMessage("The password or Email is invalid.");
            break;
          default:
            setMessage("Failed to login.");
        }
      });
  };

  if (createPage) {
    return <Create />;
  }

  return (
    <div className="flex items-center px-12 justify-center min-h-screen bg-gray-200 text-black">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        {message && (
          <div className="flex gap-24">
            <p>{message}</p>
            <button
              className="bg-red-600 text  text-gray-200 bg rounded-md px-2"
              onClick={() => setMessage("")}
            >
              X
            </button>
          </div>
        )}
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          value={email}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          value={password}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full text-gray-200 bg-[#708090] rounded-md p-2 hover:bg-[#778899]"
        >
          Login
        </button>
        <button
          onClick={changePage}
          className="bg-[#708090] text-gray-200 rounded-md px-2 py-1 hover:bg-[#778899]"
        >
          <h3 className="text-xs">Criar conta</h3>
        </button>
      </form>
    </div>
  );
}
