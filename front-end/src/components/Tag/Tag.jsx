import React, { useState, useMemo, useEffect } from "react";

function TagManagement() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Confirm delete
  const [deleteId, setDeleteId] = useState(null);

  const [genres, setGenres] = useState([
    { id: 1, name: "Shounen", description: "Hành động, phiêu lưu cho thanh thiếu niên nam." },
    { id: 2, name: "Seinen", description: "Nội dung trưởng thành, sâu sắc, dành cho người lớn." },
    { id: 3, name: "Romance", description: "Tình yêu, lãng mạn, cảm xúc nhẹ nhàng." },
    { id: 4, name: "Comedy", description: "Hài hước, vui nhộn, giải trí." },
    { id: 5, name: "Fantasy", description: "Thế giới phép thuật, quái vật, anh hùng." },
    { id: 6, name: "Isekai", description: "Nhân vật chính chuyển sinh sang thế giới khác." },
    { id: 7, name: "Slice of Life", description: "Cuộc sống thường ngày, nhẹ nhàng, chân thực." },
    { id: 8, name: "Horror", description: "Kinh dị, ma quỷ, ám ảnh tâm lý." },
    { id: 9, name: "Mystery", description: "Bí ẩn, điều tra, phá án." },
    { id: 10, name: "Sci-Fi", description: "Khoa học viễn tưởng, công nghệ, tương lai." },
    { id: 11, name: "Mecha", description: "Robot khổng lồ, chiến đấu không gian." },
    { id: 12, name: "Sports", description: "Thể thao, thi đấu, tinh thần đồng đội." },
    { id: 13, name: "Drama", description: "Cảm xúc mạnh, bi kịch, xung đột nội tâm." },
    { id: 14, name: "Adventure", description: "Khám phá, hành trình, thử thách." },
  ]);

  // Lọc dữ liệu
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return genres;
    return genres.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        (g.description || "").toLowerCase().includes(q)
    );
  }, [query, genres]);

  // Phân trang
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedGenres = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage]);

  // Reset trang khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Cắt ngắn mô tả
  const truncateDescription = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
  };

  // Hiển thị toast
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Modal
  function openAdd() {
    setModalMode("add");
    setSelected({ name: "", description: "" });
    setIsModalOpen(true);
  }

  function openEdit(g) {
    setModalMode("edit");
    setSelected({ ...g });
    setIsModalOpen(true);
  }

  function saveModal() {
    if (modalMode === "add") {
      const id = Math.max(0, ...genres.map((x) => x.id)) + 1;
      setGenres((prev) => [{ id, ...selected }, ...prev]);
      showToast("Thêm thể loại thành công!", "success");
    } else {
      setGenres((prev) => prev.map((g) => (g.id === selected.id ? selected : g)));
      showToast("Cập nhật thể loại thành công!", "success");
    }
    setIsModalOpen(false);
  }

  // Xác nhận xóa
  function confirmDelete(id) {
    setDeleteId(id);
  }

  function executeDelete() {
    setGenres((prev) => prev.filter((g) => g.id !== deleteId));
    showToast("Xóa thể loại thành công!", "success");
    setDeleteId(null);
    if (paginatedGenres.length === 1 && currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6 relative">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý thể loại truyện</h1>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-64 bg-gray-800 placeholder-gray-400 text-gray-100 rounded-md py-2 pl-3 pr-10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Tìm theo tên / mô tả..."
              />
            </div>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded-md shadow-sm border border-gray-700"
            >
              Thêm thể loại
            </button>
          </div>
        </header>

        <main>
          <section className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h2 className="text-lg font-medium">Danh sách thể loại</h2>
              <div className="text-sm text-gray-400">
                Tổng: <span className="font-semibold">{genres.length}</span> | 
                Hiển thị: <span className="font-semibold">{filtered.length}</span> kết quả
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="text-gray-300 text-sm border-b border-gray-800">
                    <th className="sticky left-0 bg-gray-900/80 py-3 px-3 min-w-10 z-10">#</th>
                    <th className="py-3 px-3 min-w-32">Tên</th>
                    <th className="py-3 px-3 min-w-64">Mô tả</th>
                    <th className="py-3 px-3 w-40 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedGenres.map((g) => (
                    <tr
                      key={g.id}
                      className="odd:bg-gray-900 even:bg-gray-800/60 hover:bg-gray-700/40 transition"
                    >
                      <td className="sticky left-0 bg-gray-900/80 py-3 px-3 text-sm text-gray-300 z-10">
                        {g.id}
                      </td>
                      <td className="py-3 px-3 text-sm font-medium">{g.name}</td>
                      <td className="py-3 px-3 text-sm text-gray-300">
                        {truncateDescription(g.description)}
                      </td>
                      <td className="py-3 px-3 text-sm">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => openEdit(g)}
                            className="px-3 py-1 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-100 text-xs"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => confirmDelete(g.id)}
                            className="px-3 py-1 rounded-md border border-red-700 bg-red-800/20 hover:bg-red-800/30 text-red-300 text-xs"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedGenres.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-gray-400">
                        Không có thể loại nào phù hợp.
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

        {/* Modal Thêm / Sửa */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsModalOpen(false)} />
            <div className="relative w-full max-w-xl mx-4">
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">
                    {modalMode === "add" ? "Thêm thể loại" : "Chỉnh sửa thể loại"}
                  </h4>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    X
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Tên</label>
                    <input
                      value={selected?.name || ""}
                      onChange={(e) =>
                        setSelected((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full bg-gray-800 text-gray-100 rounded-md px-3 py-2 border border-gray-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Mô tả (tuỳ chọn)</label>
                    <textarea
                      value={selected?.description || ""}
                      onChange={(e) =>
                        setSelected((s) => ({ ...s, description: e.target.value }))
                      }
                      className="w-full bg-gray-800 text-gray-100 rounded-md px-3 py-2 border border-gray-700 focus:outline-none"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-md border border-gray-700 text-gray-300"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={saveModal}
                      className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-100 border border-gray-700"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Xác nhận Xóa */}
        {deleteId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setDeleteId(null)} />
            <div className="relative w-full max-w-sm mx-4">
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-red-700 rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold text-red-400 mb-2">Xác nhận xóa</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Bạn có chắc chắn muốn xóa thể loại này? Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteId(null)}
                    className="px-4 py-2 rounded-md border border-gray-700 text-gray-300"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={executeDelete}
                    className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white border border-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium transition-all ${
                toast.type === "success"
                  ? "bg-green-900/90 border-green-700 text-green-200"
                  : "bg-red-900/90 border-red-700 text-red-200"
              }`}
            >
              <span>{toast.type === "success" ? "Check" : "Warning"}</span>
              <span>{toast.message}</span>
              <button
                onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                className="ml-2 text-gray-400 hover:text-white"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animation (nếu cần) */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default TagManagement;