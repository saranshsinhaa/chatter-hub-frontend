// components/Nav.js

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Nav = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLogout = () => {
    // Implement logout logic here, such as removing JWT token from localStorage
    localStorage.removeItem("token");
    // Redirect to homepage or login page
    router.push("/");
  };

  const isAuthenticated = () => {
    // Check if the user is authenticated based on your logic
    const token = localStorage.getItem("token");
    return !!token; // Return true if token exists, false otherwise
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <p className="text-white text-2xl font-bold">Group Chat</p>
        </Link>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              {/* <Link href="/dashboard">
                <p className="text-white">Dashboard</p>
              </Link> */}
              <button
                onClick={handleLogout}
                className="text-white hover:underline"
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
