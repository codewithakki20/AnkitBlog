'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google sign-in failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setLoading(true);
    try {
      await signIn("github", { callbackUrl: "/" });
    } catch (error) {
      console.error("GitHub sign-in failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-300">Email</Label>
            <Input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700" required />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-300">Password</Label>
            <Input type="password" placeholder="Enter your password" className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700" required />
          </div>
          <div className="mb-6">
            <Label className="block text-gray-700 dark:text-gray-300">Confirm Password</Label>
            <Input type="password" placeholder="Confirm your password" className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700" required />
          </div>
          <Button type="submit" className="m-2 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-600" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <div className="my-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">or</p>
        </div>
        <Button onClick={handleGoogleSignup} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600" disabled={loading}>
          {loading ? "Please wait..." : "Continue with Google"}
        </Button>
        <Button onClick={handleGithubSignup} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 mt-2" disabled={loading}>
          {loading ? "Please wait..." : "Continue with GitHub"}
        </Button>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline dark:text-blue-400">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
