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
          <div className="flex justify-between gap-1">
            <div className="text-sm text-gray-700">
              <p>{message}</p>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="bg-red-600 text-white text-xs rounded-md px-1"
                onClick={() => setMessage("")}
              >
                X
              </button>
            </div>
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
        <div className="flex justify-center">
          <button onClick={changePage} className="">
            <h3 className="text-xs font-semibold text-blue-600 hover:text-gray-700">
              Create Account
            </h3>
          </button>
        </div>
      </form>
    </div>
  );
}
