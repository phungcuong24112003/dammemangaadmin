import React, { useState, useEffect } from "react";
import './font.css';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ChevronDown,
  PanelRight,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  // Danh sách menu
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      id: "stories",
      label: "Quản Lý Truyện",
      icon: BookOpen,
      submenu: [
        { id: "truyen", label: "Truyện", path: "/admin/manga-management" },
        { id: "tac-gia", label: "Tác Giả", path: "/admin/author-management" },
        { id: "the-loai", label: "Thể Loại", path: "/admin/tag-management" },
      ],
    },
    {
      id: "users",
      label: "Quản Lý User",
      icon: Users,
      path: "/admin/guest-management",
    },
  ];

  // Lấy path hiện tại
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  // Tìm menu active từ URL
  const findActiveMenu = () => {
    for (const item of menuItems) {
      if (item.path && item.path === currentPath) {
        return { main: item.id, sub: null };
      }
      if (item.submenu) {
        const activeSub = item.submenu.find(sub => sub.path === currentPath);
        if (activeSub) {
          setExpandedSubmenu(item.id); // Mở submenu nếu có
          return { main: item.id, sub: activeSub.id };
        }
      }
    }
    return { main: "dashboard", sub: null }; // Mặc định
  };

  const [activeMenu, setActiveMenu] = useState(() => {
    const active = findActiveMenu();
    return active.sub || active.main;
  });

  // Cập nhật active khi URL thay đổi (hỗ trợ reload)
  useEffect(() => {
    const active = findActiveMenu();
    setActiveMenu(active.sub || active.main);
    if (active.main !== "dashboard" && menuItems.find(m => m.id === active.main)?.submenu) {
      setExpandedSubmenu(active.main);
    }
  }, [currentPath]);

  // Xử lý click
  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedSubmenu(expandedSubmenu === item.id ? null : item.id);
    } else if (item.path) {
      setActiveMenu(item.id);
      window.location.href = item.path; // Chuyển trang
    }
  };

  const handleSubmenuClick = (sub) => {
    setActiveMenu(sub.id);
    window.location.href = sub.path;
  };

  return (
    <div
      className={`${
        isOpen ? "w-50" : "w-16"
      } bg-gray-800 text-gray-200 transition-all duration-300 flex flex-col min-h-screen shadow-xl quicksand-uniquifier`}
    >
      {/* ===== Header ===== */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {isOpen && <div className="text-lg font-bold text-white">DMManga</div>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <PanelRight size={18} />
        </button>
      </div>

      {/* ===== Menu ===== */}
      <nav className="flex-1 overflow-y-auto py-3">
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Main Item */}
            <button
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700 transition-colors text-sm
                ${activeMenu === item.id ? "bg-gray-700 border-l-4 border-white" : ""}
                ${!isOpen ? "justify-center" : ""}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </div>
              {isOpen && item.submenu && (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    expandedSubmenu === item.id ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Submenu */}
            {isOpen && item.submenu && expandedSubmenu === item.id && (
              <div className="bg-gray-700/40">
                {item.submenu.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubmenuClick(sub)}
                    className={`w-full text-left px-4 py-2 pl-12 transition-colors text-sm hover:bg-gray-600
                      ${activeMenu === sub.id
                        ? "text-white font-semibold bg-gray-700 border-l-4 border-white"
                        : "text-gray-300"
                      }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* ===== Footer + Logout ===== */}
      <div className="border-t border-gray-700 p-4">
        {isOpen ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <p className="font-medium text-sm text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@story.com</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-sm hover:bg-gray-700 p-2 rounded-lg transition-all text-red-400 hover:text-red-300">
              <LogOut size={16} />
              <span className="text-sm">Đăng xuất</span>
            </button>
          </div>
        ) : (
          <button className="flex items-center justify-center w-full py-2 hover:bg-gray-700 rounded-lg text-red-400">
            <LogOut size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;