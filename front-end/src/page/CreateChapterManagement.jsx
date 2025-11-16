import Sidebar from '../components/Sidebar/Sidebar.jsx';
import CreateChapter from '../components/CreateChapter/CreateChapter.jsx';
import { Toaster } from "react-hot-toast";
import './font.css'


function CreateChapterManagement() {
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

export default CreateChapterManagement;
