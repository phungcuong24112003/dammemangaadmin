import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function MangaManagement() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [stories] = useState([
    {
      id: 1,
      title: "One Punch Man",
      author: "ONE, Yusuke Murata",
      description: "Saitama là một siêu anh hùng có thể đánh bại bất kỳ đối thủ nào chỉ bằng một cú đấm...",
      chapters: 30,
      views: 12300,
      cover: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg",
    },
    
    // ... thêm truyện khác
  ]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return stories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q)
    );
  }, [query, stories]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  useEffect(() => setCurrentPage(1), [query]);

  const goToDetail = (id) => {
    navigate(`/admin/manga-detail-management/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý truyện</h1>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm truyện, tác giả..."
            className="w-64 bg-gray-800 placeholder-gray-400 rounded-md py-2 px-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </header>

        <div className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr className="text-left text-sm text-gray-300">
                <th className="sticky left-0 bg-gray-800/80 py-3 px-4">#</th>
                <th className="py-3 px-4 min-w-48">Tên truyện</th>
                <th className="py-3 px-4 min-w-64">Mô tả</th>
                <th className="py-3 px-4 text-center">Chapter</th>
                <th className="py-3 px-4 text-center">Lượt xem</th>
                <th className="py-3 px-4 text-center">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((story, i) => (
                <tr
                  key={story.id}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="sticky left-0 bg-gray-900/80 py-3 px-4 text-sm text-gray-300">
                    {(currentPage - 1) * itemsPerPage + i + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={story.cover} alt="" className="w-10 h-14 object-cover rounded" />
                      <div>
                        <p className="font-medium">{story.title}</p>
                        <p className="text-xs text-gray-400">{story.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-300">
                    {story.description.slice(0, 80)}...
                  </td>
                  <td className="py-3 px-4 text-center">{story.chapters}</td>
                  <td className="py-3 px-4 text-center">{story.views.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => goToDetail(story.id)}
                      className="p-1.5 rounded hover:bg-gray-700 text-blue-400"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-center gap-1 p-3 bg-gray-800/50">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded text-xs ${
                    currentPage === i + 1
                      ? "bg-gray-700 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MangaManagement;