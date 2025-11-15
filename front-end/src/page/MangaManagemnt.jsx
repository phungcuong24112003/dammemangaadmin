import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Manga from '../components/Manga/Manga.jsx';
import { Toaster } from "react-hot-toast";
import './font.css'


function MangaManagement() {
    return (
        <div className="flex quicksand-uniquifier">
            <Toaster position="top-right" reverseOrder={false} />
            <div className='sticky top-0 h-screen z-50'>
                <Sidebar />
            </div>
            <div className="flex-1">
                <Manga />
            </div>
        </div>
    );
}

export default MangaManagement;
