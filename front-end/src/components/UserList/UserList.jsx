import React, { useState, useMemo, useEffect } from "react";

function UserManagement() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Dữ liệu mẫu
  const [users] = useState([
    { id: 1, username: "admin", password: "******", gmail: "admin@story.com" },
    { id: 2, username: "user123", password: "******", gmail: "user123@gmail.com" },
    { id: 3, username: "manga_fan", password: "******", gmail: "fan@manga.vn" },
    { id: 4, username: "otaku_kun", password: "******", gmail: "otaku@gmail.com" },
    { id: 5, username: "reader99", password: "******", gmail: "reader99@yahoo.com" },
    { id: 6, username: "shounen_love", password: "******", gmail: "shounen@outlook.com" },
    { id: 7, username: "dark_manga", password: "******", gmail: "dark@seinen.jp" },
    { id: 8, username: "romance_queen", password: "******", gmail: "queen@love.com" },
    { id: 9, username: "comedy_king", password: "******", gmail: "king@humor.net" },
    { id: 10, username: "isekai_master", password: "******", gmail: "master@isekai.world" },
    { id: 11, username: "slice_of_life", password: "******", gmail: "sol@daily.jp" },
    { id: 12, username: "horror_night", password: "******", gmail: "night@horror.tv" },
    { id: 13, username: "mystery_solver", password: "******", gmail: "solver@clue.com" },
    { id: 14, username: "sci_fi_geek", password: "******", gmail: "geek@sci.fi" },
  ]);

  // Lọc theo username hoặc gmail
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.gmail.toLowerCase().includes(q)
    );
  }, [query, users]);

  // Phân trang
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage]);

  // Reset trang khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-64 bg-gray-800 placeholder-gray-400 text-gray-100 rounded-md py-2 pl-3 pr-10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Tìm theo username / gmail..."
              />
              <span className="absolute right-3 top-2 text-gray-400 text-sm">Search</span>
            </div>
          </div>
        </header>

        <main>
          <section className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h2 className="text-lg font-medium">Danh sách người dùng</h2>
              <div className="text-sm text-gray-400">
                Tổng: <span className="font-semibold">{users.length}</span> | 
                Hiển thị: <span className="font-semibold">{filtered.length}</span> kết quả
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="text-gray-300 text-sm border-b border-gray-800">
                    <th className="sticky left-0 bg-gray-900/80 py-3 px-3 min-w-12 z-10">#</th>
                    <th className="py-3 px-3 min-w-40">Username</th>
                    <th className="py-3 px-3 min-w-40">Password</th>
                    <th className="py-3 px-3 min-w-56">Gmail</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="odd:bg-gray-900 even:bg-gray-800/60 hover:bg-gray-700/40 transition"
                    >
                      <td className="sticky left-0 bg-gray-900/80 py-3 px-3 text-sm text-gray-300 z-10">
                        {user.id}
                      </td>
                      <td className="py-3 px-3 text-sm font-medium">{user.username}</td>
                      <td className="py-3 px-3 text-sm text-gray-400">{user.password}</td>
                      <td className="py-3 px-3 text-sm text-blue-400 underline">
                        {user.gmail}
                      </td>
                    </tr>
                  ))}
                  {paginatedUsers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-gray-400">
                        Không có người dùng nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 text-sm gap-3">
                <div className="text-gray-400">
                  Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
                  {Math.min(currentPage * itemsPerPage, filtered.length)} / {filtered.length}
                </div>
                <div className="flex gap-1 justify-center">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-700 bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 text-xs"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded border text-xs ${
                        currentPage === page
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-700 bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 text-xs"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default UserManagement;