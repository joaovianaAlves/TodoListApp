"use client";
import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import Login from "./Login";

export default function Create() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createPage, setCreatePage] = useState(false);
  const [message, setMessage] = useState("");

  const changePage = async () => {
    setCreatePage(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setMessage("Account created successfully!");
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/email-already-in-use":
            setMessage(
              "The email address is already in use by another account."
            );
            break;
          case "auth/invalid-email":
            setMessage("The email address is not valid.");
            break;
          case "auth/operation-not-allowed":
            setMessage("Email/password accounts are not enabled.");
            break;
          case "auth/weak-password":
            setMessage("The password is not strong enough.");
            break;
          default:
            setMessage("Failed to create account.");
        }
      });
  };

  if (createPage) {
    return <Login />;
  }

  return (
    <div className="flex items-center px-12 justify-center min-h-screen bg-gray-200 text-black">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold ">Create Account</h1>
        {message && <p>{message}</p>}
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          value={email}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          value={password}
          className="w-full p-2 mb-3 border rounded"
        />

        <button
          type="submit"
          className="w-full text-gray-200 bg-[#708090] rounded-md p-2 hover:bg-[#778899]"
        >
          Create User
        </button>
        <button
          onClick={changePage}
          className="bg-[#708090] text-gray-200 rounded-md px-2 py-1 hover:bg-[#778899]"
        >
          <h3 className="text-xs">Login</h3>
        </button>
      </form>
    </div>
  );
}
