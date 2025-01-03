"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme-btn";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    setProgress(20);

    setTimeout(() => {
      setProgress(40);
    }, 100);

    setTimeout(() => {
      setProgress(100);
    }, 400);
  }, [pathname]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="p-4 bg-background/50 sticky top-0 border-b z-10 backdrop-blur">
      <LoadingBar
        color="#933ce6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="text-lg font-bold">AnkitBlog</div>
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            href="/"
            className="hover:scale-105 transition-transform duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:scale-105 transition-transform duration-300"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="hover:scale-105 transition-transform duration-300"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:scale-105 transition-transform duration-300"
          >
            Contact
          </Link>
          {session && session.user.role === 'admin' && (
            <Link
              href="/admin"
              className="hover:scale-105 transition-transform duration-300"
            >
              Admin
            </Link>
          )}
          <div className="flex items-center">
            {session ? (
              <Button className="mx-1" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button className="mx-1" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="mx-1" variant="outline">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
        <div className="md:hidden">
          <Sheet>
            <span className="px-2">
              <ModeToggle />
            </span>
            <SheetTrigger>
              <button
                className="text-black dark:text-white focus:outline-none"
                aria-label="Open navigation menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-bold my-4">AnkitBlog</SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col gap-6">
                    <Link href="/" className="text-gray-300 hover:text-white">
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="text-gray-300 hover:text-white"
                    >
                      About
                    </Link>
                    <Link
                      href="/blog"
                      className="text-gray-300 hover:text-white"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/contact"
                      className="text-gray-300 hover:text-white"
                    >
                      Contact
                    </Link>
                    {session && session.user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="text-gray-300 hover:text-white"
                      >
                        Admin
                      </Link>
                    )}
                    <div className="flex items-center">
                      {session ? (
                        <Button
                          className="mx-1"
                          variant="outline"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      ) : (
                        <>
                          <Link href="/login">
                            <Button className="mx-1" variant="outline">
                              Login
                            </Button>
                          </Link>
                          <Link href="/signup">
                            <Button className="mx-1" variant="outline">
                              Sign Up
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;