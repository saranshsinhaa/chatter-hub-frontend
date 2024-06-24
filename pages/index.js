const Home = () => {
  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Group Chat!</h1>
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
      </main>
    </div>
  );
};

export default Home;
