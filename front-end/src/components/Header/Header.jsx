import './font.css'
import { CircleUserRound, LogOut } from 'lucide-react';

function Header() {
    return (
        <div className="quicksand-uniquifier h-10 bg-gray-500 border-b border-gray-400 flex items-center justify-between px-20">
            <div>
                <h1 className="text-2xl font-bold text-white">DMManga</h1>
            </div>

            {/* GROUP ĐỂ HOVER */}
            <div className="relative text-white cursor-pointer group">
                <div className=' flex items-center gap-1 py-2'>
                    <CircleUserRound strokeWidth={1} />
                    <div className="font-thin">Administrator</div>
                </div>
                {/* MENU ĐĂNG XUẤT */}
                <div className="absolute top-10 left-0 bg-black px-2 w-50 py-2 text-white hidden group-hover:flex items-center gap-2 rounded">
                    <LogOut size={16} strokeWidth={1.5} />
                    <span>Đăng xuất</span>
                </div>
            </div>
        </div>
    )
}

export default Header
