import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Dashboard from '../components/Dashborad/Dashborad.jsx';
import { Toaster } from "react-hot-toast";
import './font.css'

function DashBoard() {
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 quicksand-uniquifier">
            <Toaster 
                position="top-right" 
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#1f2937',
                        color: '#e5e7eb',
                        border: '1px solid #374151',
                    },
                }}
            />

            {/* ===== SIDEBAR CỐ ĐỊNH ===== */}
            <div className="sticky top-0 h-screen z-50">
                <Sidebar />
            </div>

            {/* ===== NỘI DUNG CUỘN ĐỘC LẬP ===== */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 pb-20">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
}

export default DashBoard;