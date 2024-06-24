import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleGoToGroups = () => {
    router.push("/groups");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center font-bold mb-8">
          Welcome to Chatter Hub!
        </h1>
        {token ? (
          <div className="flex gap-4">
            <button
              onClick={handleGoToGroups}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Go to Groups
            </button>
            {/* <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Logout
            </button> */}
          </div>
        ) : (
          <div className="flex gap-4">
            <a
              href="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Register
            </a>
            <a
              href="/login"
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Login
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
