'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleGithubLogin = () => {
    signIn("github", { callbackUrl: "/" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    // Handle email/password login logic here
    console.log({ email, password });
    setError(""); // Clear error after successful login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login</h2>
        {error && (
          <p className="mb-4 text-center text-red-500">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email" className="block text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password" className="block text-gray-700 dark:text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700"
            />
          </div>
          <Button type="submit" className="m-2 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-600">
  Login
</Button>
          <div className="my-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">or</p>
        </div>
          <Button
            onClick={handleGoogleLogin}
            className="m-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Sign in with Google
          </Button>
          <Button
            onClick={handleGithubLogin}
            className="m-2 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Sign in with GitHub
          </Button>
          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline dark:text-blue-400">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
