import Sidebar from '../components/Sidebar/Sidebar.jsx';
import EditManga from '../components/EditManga/EditManga.jsx';
import { Toaster } from "react-hot-toast";
import './font.css'


function EditMangaDetailManagement() {
    return (
        <div className="flex quicksand-uniquifier">
            <Toaster position="top-right" reverseOrder={false} />
            <div className='sticky top-0 h-screen z-50'>
                <Sidebar />
            </div>
            <div className="flex-1">
                <EditManga />
            </div>
        </div>
    );
}

export default EditMangaDetailManagement;
