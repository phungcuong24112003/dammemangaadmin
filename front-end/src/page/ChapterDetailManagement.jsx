import Sidebar from '../components/Sidebar/Sidebar.jsx';
import ChapterDetail from '../components/ChapterDetail/ChapterDetail.jsx';
import { Toaster } from "react-hot-toast";
import './font.css'


function ChapterDetailManagement() {
    return (
        <div className="flex quicksand-uniquifier">
            <Toaster position="top-right" reverseOrder={false} />
            <div className='sticky top-0 h-screen z-50'>
                <Sidebar />
            </div>
            <div className="flex-1">
                <ChapterDetail />
            </div>
        </div>
    );
}

export default ChapterDetailManagement;
