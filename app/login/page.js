'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login</h2>
        <form>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-300">Email</Label>
            <Input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700" />
          </div>
          <div className="mb-6">
            <Label className="block text-gray-700 dark:text-gray-300">Password</Label>
            <Input type="password" placeholder="Enter your password" className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700" />
          </div>
          <Button type="submit" className="m-2 w-full">Login</Button>
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
