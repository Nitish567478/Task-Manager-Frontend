import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Dashboard Menu</h2>

        {/* Calendar */}
        <Calendar />

        {/* Navigation */}
        <nav className="space-y-3 mt-6">
          <a href="/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="/tasks" className="block text-gray-700 hover:text-blue-600">Tasks</a>
          <a href="/profile" className="block text-gray-700 hover:text-blue-600">Profile</a>
          <a href="/logout" className="block text-red-600 hover:text-red-700">Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-3 mb-4 flex items-center gap-3 max-w-lg">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7 7 0 1011 18a7 7 0 005.65-2.35z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full outline-none"
          />
        </div>

        {children}
      </main>
    </div>
  );
};

export default Layout;
