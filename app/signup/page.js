'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Signup = () => {
  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/" }); // Adjust the callback URL as needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign Up</h2>
        <form>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-300">Email</Label>
            <Input type="email" className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700" />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-300">Password</Label>
            <Input type="password" className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700" />
          </div>
          <div className="mb-6">
            <Label className="block text-gray-700 dark:text-gray-300">Confirm Password</Label>
            <Input type="password" className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700" />
          </div>
          <Button type="submit" className="m-2 w-full">Sign Up</Button>
        </form>
        <div className="my-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">or</p>
        </div>
        <Button onClick={handleGoogleSignup} className="m-2 w-full">
          Continue with Google
        </Button>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;