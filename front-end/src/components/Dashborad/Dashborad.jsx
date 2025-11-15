import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  BookOpen,
  Tags,
  Users,
  Star,
  Eye,
  TrendingUp,
  Server,
  Database,
  AlertCircle,
  Image,
  MessageSquare,
  Heart,
  RefreshCw,
} from "lucide-react";

// Đăng ký Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  const [serverStatus, setServerStatus] = useState("online");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // === DỮ LIỆU MẪU ===
  const stats = {
    totalStories: 2847,
    totalGenres: 24,
    totalAuthors: 512,
    totalUsers: 12843,
    totalRatings: 45291,
    totalViews: 8923471,
  };

  const viewData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        label: "Lượt xem",
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const newUsersData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Người dùng mới",
        data: [120, 180, 250, 300, 420, 580],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const newStoriesData = {
    labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    datasets: [
      {
        label: "Truyện mới",
        data: [45, 62, 58, 71],
        backgroundColor: "#8b5cf6",
      },
    ],
  };

  const topStories = [
    { rank: 1, title: "One Piece", views: 892347, rating: 4.9 },
    { rank: 2, title: "Attack on Titan", views: 765432, rating: 4.8 },
    { rank: 3, title: "Jujutsu Kaisen", views: 654321, rating: 4.7 },
    { rank: 4, title: "Demon Slayer", views: 543210, rating: 4.6 },
    { rank: 5, title: "Solo Leveling", views: 432109, rating: 4.9 },
  ];

  const recentStories = [
    { id: 1, title: "Chương 1050: Kết thúc hành trình", updated: "2 giờ trước" },
    { id: 2, title: "Chương 89: Cuộc chiến cuối cùng", updated: "5 giờ trước" },
    { id: 3, title: "Chương 12: Bí mật bị phanh phui", updated: "1 ngày trước" },
  ];

  const recentComments = [
    { user: "manga_fan123", story: "One Piece", comment: "Chương này đỉnh cao!", time: "10 phút trước" },
    { user: "otaku_kun", story: "JJK", comment: "Gojo comeback khi nào?", time: "25 phút trước" },
    { user: "reader99", story: "Solo Leveling", comment: "Tác giả vẽ đẹp quá!", time: "1 giờ trước" },
  ];

  const systemInfo = {
    serverStatus: "online",
    imageStorage: { used: 2.4, total: 10, unit: "GB" },
    apiRequests: 124567,
    recentErrors: [
      { time: "14:32", message: "Timeout khi tải ảnh từ CDN" },
      { time: "13:15", message: "User login failed (IP: 192.168.1.100)" },
    ],
  };

  const homeSlides = [
    { id: 1, title: "One Piece - Arc Wano", active: true },
    { id: 2, title: "Jujutsu Kaisen Season 2", active: true },
    { id: 3, title: "Solo Leveling Anime", active: false },
  ];

  // === XỬ LÝ REFRESH SERVER ===
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setServerStatus(serverStatus === "online" ? "checking" : "online");
      setTimeout(() => {
        setServerStatus("online");
        setIsRefreshing(false);
      }, 1000);
    }, 1500);
  };

  // === CÀI ĐẶT BIỂU ĐỒ ===
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#e5e7eb" } },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "#374151" } },
      y: { ticks: { color: "#9ca3af" }, grid: { color: "#374151" } },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              isRefreshing
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
            }`}
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            <span className="text-sm">Làm mới</span>
          </button>
        </div>

        {/* ===== TOP STATS CARDS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Tổng truyện", value: stats.totalStories, icon: BookOpen, color: "from-blue-500 to-blue-600" },
            { label: "Thể loại", value: stats.totalGenres, icon: Tags, color: "from-purple-500 to-purple-600" },
            { label: "Tác giả", value: stats.totalAuthors, icon: Users, color: "from-green-500 to-green-600" },
            { label: "Người dùng", value: stats.totalUsers, icon: Users, color: "from-yellow-500 to-yellow-600" },
            { label: "Đánh giá", value: stats.totalRatings, icon: Star, color: "from-pink-500 to-pink-600" },
            { label: "Lượt xem", value: stats.totalViews.toLocaleString(), icon: Eye, color: "from-red-500 to-red-600" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={20} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== BIỂU ĐỒ THỐNG KÊ ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Eye className="text-emerald-400" size={18} />
              Lượt xem theo ngày
            </h3>
            <div className="h-64">
              <Line data={viewData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="text-blue-400" size={18} />
              Người dùng mới
            </h3>
            <div className="h-64">
              <Bar data={newUsersData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="text-purple-400" size={18} />
              Truyện mới đăng
            </h3>
            <div className="h-64">
              <Bar data={newStoriesData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Star className="text-yellow-400" size={18} />
              Top truyện xem nhiều
            </h3>
            <div className="h-64">
              <Pie
                data={{
                  labels: topStories.map(s => s.title),
                  datasets: [{
                    data: topStories.map(s => s.views),
                    backgroundColor: ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#3b82f6"],
                  }],
                }}
                options={{ ...chartOptions, plugins: { legend: { position: "right" } } }}
              />
            </div>
          </div>
        </div>

        {/* ===== TOP NỘI DUNG NỔI BẬT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top truyện xem nhiều */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Eye className="text-red-400" size={18} />
              Top truyện xem nhiều
            </h3>
            <div className="space-y-2">
              {topStories.map((story) => (
                <div key={story.rank} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-500 w-8">#{story.rank}</span>
                    <div>
                      <p className="font-medium">{story.title}</p>
                      <p className="text-xs text-gray-400">{story.views.toLocaleString()} lượt xem</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-medium">{story.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Truyện mới cập nhật */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <RefreshCw className="text-green-400" size={18} />
              Truyện mới cập nhật
            </h3>
            <div className="space-y-2">
              {recentStories.map((story) => (
                <div key={story.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div>
                    <p className="font-medium">{story.title}</p>
                    <p className="text-xs text-gray-400">{story.updated}</p>
                  </div>
                  <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">Mới</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bình luận mới nhất */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="text-blue-400" size={18} />
              Bình luận mới nhất
            </h3>
            <div className="space-y-2">
              {recentComments.map((c, i) => (
                <div key={i} className="p-3 bg-gray-900/50 rounded-lg">
                  <p className="text-sm font-medium">{c.user}</p>
                  <p className="text-xs text-gray-400">trong <i>{c.story}</i></p>
                  <p className="text-sm mt-1">"{c.comment}"</p>
                  <p className="text-xs text-gray-500 mt-1">{c.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top yêu thích */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Heart className="text-pink-400" size={18} />
              Top truyện được yêu thích
            </h3>
            <div className="space-y-2">
              {topStories.slice(0, 3).map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart size={16} fill="#ec4899" className="text-pink-500" />
                    <span className="font-medium">{s.title}</span>
                  </div>
                  <span className="text-xs text-gray-400">{(s.views / 1000).toFixed(1)}K lượt thích</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== QUẢN LÝ HỆ THỐNG ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trạng thái server */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Server className="text-cyan-400" size={18} />
              Trạng thái hệ thống
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  systemInfo.serverStatus === "online"
                    ? "bg-green-900/50 text-green-300"
                    : "bg-red-900/50 text-red-300"
                }`}>
                  {systemInfo.serverStatus === "online" ? "Hoạt động" : "Lỗi"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dung lượng ảnh</span>
                <span className="text-sm">
                  {systemInfo.imageStorage.used} / {systemInfo.imageStorage.total} GB
                  <span className="text-xs text-gray-400 ml-1">
                    ({((systemInfo.imageStorage.used / systemInfo.imageStorage.total) * 100).toFixed(0)}%)
                  </span>
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                  style={{ width: `${(systemInfo.imageStorage.used / systemInfo.imageStorage.total) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Request (24h)</span>
                <span className="font-mono text-sm">{systemInfo.apiRequests.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Log lỗi */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="text-orange-400" size={18} />
              Log lỗi gần đây
            </h3>
            <div className="space-y-2 text-sm">
              {systemInfo.recentErrors.map((err, i) => (
                <div key={i} className="p-2 bg-red-900/20 border border-red-800/50 rounded">
                  <p className="text-red-300 text-xs">{err.time}</p>
                  <p className="text-red-200">{err.message}</p>
                </div>
              ))}
              {systemInfo.recentErrors.length === 0 && (
                <p className="text-gray-400 text-center py-4">Không có lỗi nào</p>
              )}
            </div>
          </div>
        </div>

        {/* Slide Home */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Image className="text-indigo-400" size={18} />
            Quản lý Slide Trang chủ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {homeSlides.map((slide) => (
              <div
                key={slide.id}
                className={`p-4 rounded-lg border ${
                  slide.active
                    ? "bg-green-900/20 border-green-700"
                    : "bg-gray-900/50 border-gray-700"
                }`}
              >
                <p className="font-medium">{slide.title}</p>
                <p className="text-xs mt-1">
                  Trạng thái: <span className={slide.active ? "text-green-400" : "text-gray-400"}>
                    {slide.active ? "Hiển thị" : "Ẩn"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;