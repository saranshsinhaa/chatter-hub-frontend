// components/Nav.js

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Nav = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <p className="text-white text-2xl font-bold">Chatter Hub</p>
        </Link>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              {/* <Link href="/dashboard">
                <p className="text-white">Dashboard</p>
              </Link> */}
              <Link href="/">
                <p className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300">
                  Home
                </p>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <p className="text-white">Login</p>
              </Link>
              <Link href="/register">
                <p className="text-white">Register</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
