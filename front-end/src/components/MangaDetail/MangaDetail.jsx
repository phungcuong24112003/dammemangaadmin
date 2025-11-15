import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpenText, Eye, MessageSquare, Edit, Trash2, Plus, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function MangaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form state
  const [editForm, setEditForm] = useState({});
  const [chapterForm, setChapterForm] = useState({ number: "", title: "" });

  // Mock data (sau này lấy từ API)
  const mockData = {
    1: {
      id: 1,
      title: "ONE PUNCH MAN (MURATA ART)",
      author: "ONE, Yusuke Murata",
      description: "Saitama là một siêu anh hùng có thể đánh bại bất kỳ đối thủ nào chỉ bằng một cú đấm...",
      chapters: 30,
      views: 12300,
      cover: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg?updatedAt=1762764056279",
      poster: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/OnePunchManPoster.jpg?updatedAt=1762702479396",
      genres: ["Seinen"],
      lastUpdate: "4 ngày trước",
      chaptersList: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        number: i + 1,
        title: `Chapter ${i + 1}: One Punch!!`,
        date: `${30 - i} ngày trước`,
      })).reverse(),
      comments: [
        { id: 1, user: "Nguyễn An", text: "Truyện hay cực kỳ luôn!!!", date: "2 ngày trước" },
        { id: 2, user: "Minh Quân", text: "Chờ chap mới hơi lâu", date: "1 ngày trước" },
      ],
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const data = mockData[id];
      if (data) {
        setStory(data);
        setEditForm(data);
        setChapterForm({ number: data.chapters + 1, title: "" });
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setStory(editForm);
    toast.success("Cập nhật truyện thành công!");
    setShowEditModal(false);
  };

  const handleAddChapter = () => {
    if (!chapterForm.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề chapter!");
      return;
    }
    const newChapter = {
      id: Date.now(),
      number: chapterForm.number,
      title: chapterForm.title,
      date: "Vừa xong",
    };
    const updated = {
      ...story,
      chapters: story.chapters + 1,
      chaptersList: [newChapter, ...story.chaptersList],
      lastUpdate: "Vừa xong",
    };
    setStory(updated);
    setChapterForm({ number: updated.chapters + 1, title: "" });
    toast.success("Thêm chapter thành công!");
    setShowAddChapterModal(false);
  };

  const handleDeleteStory = () => {
    toast.success("Xóa truyện thành công!");
    navigate("/manga-management");
  };

  if (isLoading) return <div className="text-center py-20 text-gray-400">Đang tải...</div>;
  if (!story) return <div className="text-center py-20 text-red-400">Không tìm thấy truyện!</div>;

  return (
    <div className="quicksand-uniquifier bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-100 overflow-auto">
      <Toaster position="top-right" />

      {/* === HEADER === */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <button
          onClick={() => navigate("/manga-management")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
        >
          ← Quay lại
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm"
          >
            <Edit size={16} /> Sửa truyện
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
          >
            <Trash2 size={16} /> Xóa truyện
          </button>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="">
        <div className="mx-auto max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden my-8">
          <div className="flex flex-col relative">
            {/* === POSTER === */}
            <div className="h-96 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img
                src={story.poster}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* === INFO === */}
            <div className="absolute top-60 left-8 right-8 z-20 flex gap-10">
              <img
                src={story.cover}
                alt=""
                className="w-52 h-72 rounded-xl object-cover shadow-2xl"
              />
              <div className="text-white mt-16">
                <h1 className="text-3xl font-bold">{story.title}</h1>
                <p className="text-lg opacity-90">{story.author}</p>
                <p className="mt-4 text-black">
                  Cập nhật từ: <span className="font-medium">{story.lastUpdate}</span>
                </p>
                <div className="mt-5 flex gap-4 flex-wrap">
                  {story.genres.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 rounded-full text-gray-700 bg-gray-100 text-sm font-bold flex items-center gap-1"
                    >
                      {g}
                      <span className="bg-gray-300 text-xs px-1.5 py-0.5 rounded-full ml-1">
                        {story.chapters}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* === CONTENT === */}
            <div className="p-8 pb-16 mt-50">
              <div className="flex gap-10">
                {/* === DANH SÁCH CHAPTER === */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-gray-600 uppercase">
                      Danh sách chương
                    </h3>
                    <button
                      onClick={() => setShowAddChapterModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium"
                    >
                      <Plus size={16} /> Thêm chapter
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-96 overflow-y-auto">
                    {story.chaptersList.map((ch) => (
                      <div
                        key={ch.id}
                        className="flex justify-between items-center bg-white hover:bg-gray-50 p-3 mb-2 rounded-lg border border-gray-100 transition"
                      >
                        <span className="font-semibold text-gray-700">{ch.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{ch.date}</span>
                          <button className="p-1 hover:bg-gray-200 rounded text-yellow-600">
                            <Edit size={14} />
                          </button>
                          <button className="p-1 hover:bg-red-100 rounded text-red-600">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* === THỐNG KÊ + BÌNH LUẬN === */}
                <div className="w-80 space-y-8">
                  {/* Thống kê */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">
                      Thống kê
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-2">
                          <BookOpenText size={16} className="text-gray-500" />
                          <span className="text-xs text-gray-500">Số chương</span>
                        </div>
                        <div className="font-bold text-gray-800 mt-1">{story.chapters}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-2">
                          <Eye size={16} className="text-gray-500" />
                          <span className="text-xs text-gray-500">Lượt xem</span>
                        </div>
                        <div className="font-bold text-gray-800 mt-1">
                          {(story.views / 1000).toFixed(1)}K
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bình luận (chỉ hiển thị) */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">
                      Nhận xét truyện
                    </h3>
                    <div className="border border-gray-200 rounded-lg bg-gray-50 p-3 max-h-64 overflow-y-auto">
                      {story.comments.map((c) => (
                        <div key={c.id} className="bg-white p-2 mb-2 rounded-lg border border-gray-100">
                          <div className="font-semibold text-sm text-gray-700">{c.user}</div>
                          <div className="text-sm text-gray-600">{c.text}</div>
                          <div className="text-[11px] text-gray-400 mt-1">{c.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === MODAL SỬA TRUYỆN === */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Sửa truyện</h3>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Tên truyện"
              />
              <input
                value={editForm.author}
                onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Tác giả"
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Mô tả"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL THÊM CHAPTER === */}
      {showAddChapterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">Thêm chapter mới</h3>
            <div className="space-y-3">
              <input
                type="number"
                value={chapterForm.number}
                onChange={(e) => setChapterForm({ ...chapterForm, number: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Số chương"
              />
              <input
                value={chapterForm.title}
                onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Tiêu đề chapter"
              />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowAddChapterModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleAddChapter}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === XÁC NHẬN XÓA TRUYỆN === */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-bold text-red-600 mb-2">Xóa truyện?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteStory}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MangaDetail;