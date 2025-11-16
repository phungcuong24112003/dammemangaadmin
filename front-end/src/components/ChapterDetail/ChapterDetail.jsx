import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, GripVertical } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function ChapterDetail() {
  const { storyId, chapterId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [chapterNumber, setChapterNumber] = useState("");
  const [images, setImages] = useState([]); // [{ id, url, file?, isNew? }]
  const [dragIndex, setDragIndex] = useState(null);

  // Mock data: Lấy chapter hiện tại
  const mockChapterData = {
    id: "chap-123",
    number: 31,
    images: [
      "https://i.ibb.co/0jZqY8K/page1.jpg",
      "https://i.ibb.co/3dGbs7v/page2.jpg",
      "https://i.ibb.co/4pDwkZf/page3.jpg",
      "https://i.ibb.co/5xY8v9k/page4.jpg",
    ],
  };

  useEffect(() => {
    // Giả lập fetch
    setTimeout(() => {
      setChapterNumber(mockChapterData.number);
      setImages(
        mockChapterData.images.map((url, i) => ({
          id: `existing-${i}`,
          url,
        }))
      );
      setIsLoading(false);
    }, 600);
  }, [chapterId]);

  // ============================
  // 1) Thêm ảnh mới (preview ngay)
  // ============================
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => ({
      id: `new-${Date.now()}-${Math.random()}`,
      preview: URL.createObjectURL(file),
      file,
      isNew: true,
    }));

    setImages((prev) => [...prev, ...newImages]);
    toast.success(`Đã thêm ${newImages.length} ảnh mới!`);
  };

  // ============================
  // 2) Xóa ảnh
  // ============================
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Đã xóa ảnh!");
  };

  // ============================
  // 3) Kéo thả
  // ============================
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) return;

    const newImages = [...images];
    const [draggedItem] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, draggedItem);

    setImages(newImages);
    setDragIndex(null);
    toast.success("Đã thay đổi thứ tự trang!");
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  // ============================
  // 4) Upload ảnh mới lên ImgBB
  // ============================
  const uploadToImgBB = async (file) => {
    const form = new FormData();
    form.append("image", file);
    const API_KEY = "0340594a6f5577fe462eb5783e474022";

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) return data.data.url;
      console.log("ImgBB Error:", data);
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  // ============================
  // 5) Lưu chapter
  // ============================
  const handleSave = async () => {
    if (!chapterNumber || images.length === 0) {
      toast.error("Vui lòng nhập số chapter và có ít nhất 1 ảnh!");
      return;
    }

    setIsSaving(true);
    setUploading(true);

    const newImages = images.filter((img) => img.isNew);
    const uploadedURLs = [];

    for (let img of newImages) {
      const url = await uploadToImgBB(img.file);
      if (url) uploadedURLs.push(url);
    }

    setUploading(false);

    if (newImages.length > 0 && uploadedURLs.length !== newImages.length) {
      toast.error("Một số ảnh mới upload thất bại!");
      setIsSaving(false);
      return;
    }

    // Gộp URL cũ + URL mới
    const finalURLs = images.map((img) =>
      img.isNew ? uploadedURLs.shift() : img.url
    );

    console.log("CHAPTER UPDATED:", { chapterNumber, images: finalURLs });

    setIsSaving(false);
    toast.success("Cập nhật chapter thành công!");
    navigate(`/admin/manga-detail-management/${storyId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-gray-400">Đang tải chapter...</div>
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
          <h1 className="text-2xl font-bold">Chi tiết Chapter {chapterNumber}</h1>
          <button
            onClick={handleSave}
            disabled={isSaving || uploading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition ${
              isSaving || uploading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSaving || uploading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Số chapter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Số chapter
              </label>
              <input
                type="number"
                value={chapterNumber}
                onChange={(e) => setChapterNumber(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Thêm ảnh mới */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Thêm ảnh mới
              </label>
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 transition bg-gray-800">
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Upload size={32} />
                  <p className="text-sm">Click để thêm ảnh mới</p>
                  <p className="text-xs">Upload khi nhấn Lưu</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            </div>

            {/* Tổng số trang */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400">Tổng số trang</p>
              <p className="text-2xl font-bold text-blue-400">{images.length}</p>
            </div>
          </div>

          {/* Danh sách ảnh - KÉO THẢ */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">
              Sắp xếp trang (kéo thả để đổi vị trí)
            </h3>

            {images.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <Upload size={48} className="mx-auto mb-3 opacity-50" />
                <p>Chưa có trang nào</p>
              </div>
            ) : (
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-screen overflow-y-auto p-1"
                onDragOver={handleDragOver}
              >
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                      dragIndex === index
                        ? "border-blue-500 shadow-lg scale-105 z-10"
                        : "border-gray-700"
                    } cursor-move`}
                  >
                    <img
                      src={img.preview || img.url}
                      alt={`Page ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />

                    {/* Xóa */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(img.id);
                        }}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-full"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Số thứ tự */}
                    <div className="absolute top-2 left-2 bg-gray-900/80 px-2 py-1 rounded text-xs font-bold">
                      {index + 1}
                    </div>

                    {/* Kéo */}
                    <div className="absolute top-2 right-2 bg-gray-900/80 p-1 rounded opacity-0 group-hover:opacity-100 transition">
                      <GripVertical size={16} className="text-gray-400" />
                    </div>

                    {/* Mới */}
                    {img.isNew && (
                      <div className="absolute bottom-2 right-2 bg-green-600 text-xs px-2 py-1 rounded">
                        MỚI
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChapterDetail;