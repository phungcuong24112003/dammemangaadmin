import React, { useState, useMemo, useEffect } from "react";

function AuthorManagement() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  // Xác nhận xóa
  const [deleteId, setDeleteId] = useState(null);

  const [authors, setAuthors] = useState([
    { id: 1, name: "Fujiko F. Fujio" },
    { id: 2, name: "Eiichiro Oda" },
    { id: 3, name: "Masashi Kishimoto" },
    { id: 4, name: "Rumiko Takahashi" },
    { id: 5, name: "CLAMP" },
    { id: 6, name: "Kentaro Miura" },
    { id: 7, name: "Hirohiko Araki" },
    { id: 8, name: "Naoko Takeuchi" },
    { id: 9, name: "Yoshihiro Togashi" },
    { id: 10, name: "Tetsuya Nomura" },
    { id: 11, name: "Sui Ishida" },
    { id: 12, name: "Koyoharu Gotouge" },
    { id: 13, name: "Gege Akutami" },
    { id: 14, name: "Haruichi Furudate" },
  ]);

  // Lọc
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return authors;
    return authors.filter((a) => a.name.toLowerCase().includes(q));
  }, [query, authors]);

  // Phân trang
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedAuthors = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage]);

  // Reset trang khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Toast
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  // Modal
  function openAdd() {
    setModalMode("add");
    setSelected({ name: "" });
    setIsModalOpen(true);
  }

  function openEdit(author) {
    setModalMode("edit");
    setSelected({ ...author });
    setIsModalOpen(true);
  }

  function saveModal() {
    if (!selected?.name?.trim()) {
      showToast("Vui lòng nhập tên tác giả!", "error");
      return;
    }

    if (modalMode === "add") {
      const id = Math.max(0, ...authors.map((a) => a.id)) + 1;
      setAuthors((prev) => [{ id, name: selected.name.trim() }, ...prev]);
      showToast("Thêm tác giả thành công!", "success");
    } else {
      setAuthors((prev) =>
        prev.map((a) => (a.id === selected.id ? { ...a, name: selected.name.trim() } : a))
      );
      showToast("Cập nhật tác giả thành công!", "success");
    }
    setIsModalOpen(false);
  }

  function confirmDelete(id) {
    setDeleteId(id);
  }

  function executeDelete() {
    setAuthors((prev) => prev.filter((a) => a.id !== deleteId));
    showToast("Xóa tác giả thành công!", "success");
    setDeleteId(null);
    if (paginatedAuthors.length === 1 && currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6 relative">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý tác giả</h1>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-64 bg-gray-800 placeholder-gray-400 text-gray-100 rounded-md py-2 pl-3 pr-10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Tìm theo tên tác giả..."
              />
            </div>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded-md shadow-sm border border-gray-700"
            >
              Thêm tác giả
            </button>
          </div>
        </header>

        <main>
          <section className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h2 className="text-lg font-medium">Danh sách tác giả</h2>
              <div className="text-sm text-gray-400">
                Tổng: <span className="font-semibold">{authors.length}</span> | 
                Hiển thị: <span className="font-semibold">{filtered.length}</span> kết quả
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="text-gray-300 text-sm border-b border-gray-800">
                    <th className="sticky left-0 bg-gray-900/80 py-3 px-3 min-w-10 z-10">#</th>
                    <th className="py-3 px-3 min-w-48">Tên tác giả</th>
                    <th className="py-3 px-3 w-40 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAuthors.map((author) => (
                    <tr
                      key={author.id}
                      className="odd:bg-gray-900 even:bg-gray-800/60 hover:bg-gray-700/40 transition"
                    >
                      <td className="sticky left-0 bg-gray-900/80 py-3 px-3 text-sm text-gray-300 z-10">
                        {author.id}
                      </td>
                      <td className="py-3 px-3 text-sm font-medium">{author.name}</td>
                      <td className="py-3 px-3 text-sm">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => openEdit(author)}
                            className="px-3 py-1 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-100 text-xs"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => confirmDelete(author.id)}
                            className="px-3 py-1 rounded-md border border-red-700 bg-red-800/20 hover:bg-red-800/30 text-red-300 text-xs"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedAuthors.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-gray-400">
                        Không có tác giả nào phù hợp.
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
            <div className="relative w-full max-w-md mx-4">
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">
                    {modalMode === "add" ? "Thêm tác giả" : "Chỉnh sửa tác giả"}
                  </h4>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    X
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Tên tác giả</label>
                    <input
                      value={selected?.name || ""}
                      onChange={(e) =>
                        setSelected((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full bg-gray-800 text-gray-100 rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="Nhập tên tác giả..."
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
                  Bạn có chắc chắn muốn xóa tác giả này? Hành động này không thể hoàn tác.
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

        {/* Toast */}
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default AuthorManagement;