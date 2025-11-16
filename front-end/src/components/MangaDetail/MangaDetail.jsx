import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpenText, Eye, MessageSquare, Trash2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function MangaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock data
  const mockData = {
    1: {
      id: 1,
      title: "ONE PUNCH MAN (MURATA ART)",
      author: "ONE, Yusuke Murata",
      description:
        "Saitama là một siêu anh hùng có thể đánh bại bất kỳ đối thủ nào chỉ bằng một cú đấm...",
      chapters: 30,
      views: 12300,
      cover:
        "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg?updatedAt=1762764056279",
      poster:
        "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/OnePunchManPoster.jpg?updatedAt=1762702479396",
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
      if (data) setStory(data);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleDeleteStory = () => {
    toast.success("Xóa truyện thành công!");
    navigate("/admin/manga-management");
  };

  const goToEdit = () => navigate(`/admin/edit-manga-detail/${id}`);
  const goToCreateChapter = () => navigate(`/admin/create-chapter/${id}`);
  const goToChapterDetail = (chapterId) =>
    navigate(`/admin/chapter-detail/${id}/${chapterId}`);

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-400">Đang tải...</div>
    );
  if (!story)
    return (
      <div className="text-center py-20 text-red-400">Không tìm thấy truyện!</div>
    );

  return (
    <div className="quicksand-uniquifier bg-gray-900 text-gray-200 min-h-screen overflow-y-auto">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <button
          onClick={() => navigate("/admin/manga-management")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-200"
        >
          ← Quay lại
        </button>

        <div className="flex gap-3">
          <button
            onClick={goToEdit}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-medium text-white"
          >
            Sửa truyện
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white"
          >
            <Trash2 size={16} /> Xóa truyện
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-6xl rounded-xl shadow-2xl overflow-hidden my-8 bg-gray-800">
        <div className="flex flex-col relative">

          {/* POSTER */}
          <div className="h-96 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <img
              src={story.poster}
              alt=""
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          {/* INFO OVERLAY */}
          <div className="absolute top-60 left-8 right-8 z-20 flex gap-10">
            <img
              src={story.cover}
              alt=""
              className="w-52 h-72 rounded-xl object-cover shadow-2xl border border-gray-700"
            />
            <div className="text-gray-100 mt-16">
              <h1 className="text-3xl font-bold">{story.title}</h1>
              <p className="text-lg text-gray-300">{story.author}</p>
              <p className="mt-4">
                Cập nhật từ:{" "}
                <span className="font-medium text-gray-100">
                  {story.lastUpdate}
                </span>
              </p>

              {/* GENRES */}
              <div className="mt-5 flex gap-4 flex-wrap">
                {story.genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 rounded-full bg-gray-700 text-gray-200 text-sm font-bold flex items-center gap-1 border border-gray-600"
                  >
                    {g}
                    <span className="bg-gray-600 text-xs px-1.5 py-0.5 rounded-full ml-1">
                      {story.chapters}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-8 pb-16 mt-60">
            <div className="flex gap-10">

              {/* CHAPTER LIST */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase">
                    Danh sách chương
                  </h3>
                  <button
                    onClick={goToCreateChapter}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium text-white"
                  >
                    Thêm chapter
                  </button>
                </div>

                <div className="border border-gray-700 rounded-lg p-3 bg-gray-900 max-h-96 overflow-y-auto">
                  {story.chaptersList.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => goToChapterDetail(ch.id)}
                      className="w-full flex justify-between items-center bg-gray-800 hover:bg-gray-700 p-3 mb-2 rounded-lg border border-gray-700 transition text-left"
                    >
                      <span className="font-semibold text-gray-200">
                        {ch.title}
                      </span>
                      <span className="text-xs text-gray-400">{ch.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* STATS & COMMENTS */}
              <div className="w-80 space-y-8">
                {/* Stats */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
                    Thống kê
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                      <div className="flex items-center gap-2">
                        <BookOpenText size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-400">Số chương</span>
                      </div>
                      <div className="font-bold text-gray-200 mt-1">
                        {story.chapters}
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-400">Lượt xem</span>
                      </div>
                      <div className="font-bold text-gray-200 mt-1">
                        {(story.views / 1000).toFixed(1)}K
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
                    Nhận xét truyện
                  </h3>
                  <div className="border border-gray-700 rounded-lg bg-gray-900 p-3 max-h-64 overflow-y-auto">
                    {story.comments.map((c) => (
                      <div
                        key={c.id}
                        className="bg-gray-800 p-2 mb-2 rounded-lg border border-gray-700"
                      >
                        <div className="font-semibold text-sm text-gray-200">
                          {c.user}
                        </div>
                        <div className="text-sm text-gray-300">{c.text}</div>
                        <div className="text-[11px] text-gray-500 mt-1">
                          {c.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-sm mx-4 border border-gray-700">
            <h3 className="text-lg font-bold text-red-400 mb-2">Xóa truyện?</h3>
            <p className="text-sm text-gray-400 mb-4">
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteStory}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
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
