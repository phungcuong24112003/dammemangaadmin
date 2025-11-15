import Sidebar from '../components/Sidebar/Sidebar.jsx';
import MangaDetail from '../components/MangaDetail/MangaDetail.jsx';
import { Toaster } from "react-hot-toast";
import './font.css'


function MangaDetailManagement() {
    return (
        <div className="flex quicksand-uniquifier">
            <Toaster position="top-right" reverseOrder={false} />
            <div className='sticky top-0 h-screen z-50'>
                <Sidebar />
            </div>
            <div className="flex-1">
                <MangaDetail />
            </div>
        </div>
    );
}

export default MangaDetailManagement;
