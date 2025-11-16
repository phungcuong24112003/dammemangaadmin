import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, ChevronDown, Check } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function MangaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [story, setStory] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    tags: [],
    cover: "",
    poster: "",
  });

  // Danh sách tác giả (từ trang quản lý tác giả)
  const [authors] = useState([
    "ONE, Yusuke Murata",
    "Eiichiro Oda",
    "Tatsuki Fujimoto",
    "Koyoharu Gotouge",
    "Gege Akutami",
  ]);

  // Danh sách thể loại (từ trang quản lý thể loại)
  const [genres] = useState([
    "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery",
    "Romance", "Sci-Fi", "Seinen", "Shounen", "Slice of Life", "Supernatural",
    "Isekai", "Mecha", "Psychological", "Sports", "Thriller"
  ]);

  // Dropdown state
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  // Mock data
  const mockData = {
    1: {
      id: 1,
      title: "ONE PUNCH MAN (MURATA ART)",
      author: "ONE, Yusuke Murata",
      description: "Saitama là một siêu anh hùng có thể đánh bại bất kỳ đối thủ nào chỉ bằng một cú đấm...",
      tags: ["Seinen", "Action", "Comedy"],
      cover: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg?updatedAt=1762764056279",
      poster: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/OnePunchManPoster.jpg?updatedAt=1762702479396",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const data = mockData[id];
      if (data) {
        setStory(data);
        setFormData({
          title: data.title,
          author: data.author,
          description: data.description,
          tags: [...data.tags],
          cover: data.cover,
          poster: data.poster,
        });
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  // Upload ảnh
  const uploadImage = async (file, type) => {
    const form = new FormData();
    form.append("image", file);
    const API_KEY = "YOUR_IMGBB_API_KEY"; // Thay bằng key thật

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${type === 'cover' ? 'Ảnh bìa' : 'Poster'} đã được tải lên!`);
        return data.data.url;
      }
    } catch (err) {
      toast.error("Lỗi upload ảnh!");
    }
    return null;
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file, type);
    if (url) setFormData({ ...formData, [type]: url });
  };

  // Chọn tác giả
  const selectAuthor = (author) => {
    setFormData({ ...formData, author });
    setShowAuthorDropdown(false);
  };

  // Chọn thể loại
  const toggleGenre = (genre) => {
    const newTags = formData.tags.includes(genre)
      ? formData.tags.filter(t => t !== genre)
      : [...formData.tags, genre];
    setFormData({ ...formData, tags: newTags });
  };

  // Lưu
  const handleSave = async () => {
    if (!formData.title.trim() || !formData.author) {
      toast.error("Vui lòng nhập tên truyện và chọn tác giả!");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Cập nhật truyện thành công!");
      navigate(`/admin/manga-detail-management/${id}`);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-gray-400">Đang tải...</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-red-400">Không tìm thấy truyện!</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="border-b border-gray-700 p-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
          >
            <ArrowLeft size={16} /> Quay lại
          </button>
          <h1 className="text-2xl font-bold">Chỉnh sửa truyện</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition ${
              isSaving
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ảnh bìa & Poster */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Ảnh bìa</label>
              <div className="relative group">
                <img
                  src={formData.cover}
                  alt="Cover"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-xl cursor-pointer">
                  <Upload size={24} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "cover")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Poster</label>
              <div className="relative group">
                <img
                  src={formData.poster}
                  alt="Poster"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-xl cursor-pointer">
                  <Upload size={24} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "poster")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form chỉnh sửa */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tên truyện */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tên truyện</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên truyện..."
              />
            </div>

            {/* Tác giả - Chỉ chọn */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tác giả (Quản lý riêng)
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left flex justify-between items-center focus:ring-2 focus:ring-blue-500"
                >
                  <span className={formData.author ? "text-white" : "text-gray-500"}>
                    {formData.author || "Chọn tác giả..."}
                  </span>
                  <ChevronDown size={18} className="text-gray-400" />
                </button>
                {showAuthorDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {authors.map((a) => (
                      <button
                        key={a}
                        onClick={() => selectAuthor(a)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm flex justify-between items-center"
                      >
                        {a}
                        {formData.author === a && <Check size={14} className="text-green-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Quản lý tác giả ở trang riêng.</p>
            </div>

            {/* Thể loại - Chỉ chọn */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Thể loại (Quản lý riêng)
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left flex justify-between items-center focus:ring-2 focus:ring-blue-500"
                >
                  <span className={formData.tags.length > 0 ? "text-white" : "text-gray-500"}>
                    {formData.tags.length > 0
                      ? `${formData.tags.length} thể loại đã chọn`
                      : "Chọn thể loại..."}
                  </span>
                  <ChevronDown size={18} className="text-gray-400" />
                </button>
                {showGenreDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {genres.map((g) => (
                      <button
                        key={g}
                        onClick={() => toggleGenre(g)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm flex justify-between items-center"
                      >
                        {g}
                        {formData.tags.includes(g) && <Check size={14} className="text-green-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-blue-900/50 text-blue-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Quản lý thể loại ở trang riêng.</p>
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mô tả truyện</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Nhập mô tả truyện..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MangaDetail;