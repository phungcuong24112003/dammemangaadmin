import Sidebar from '../components/Sidebar/Sidebar.jsx';
import TagManagmant from '../components/Tag/Tag.jsx';
import { Toaster } from "react-hot-toast";
import './font.css'


function GustManagement() {
    return (
        <div className="flex quicksand-uniquifier">
            <Toaster position="top-right" reverseOrder={false} />
            <div className='sticky top-0 h-screen z-50'>
                <Sidebar />
            </div>
            <div className="flex-1">
                <TagManagmant />
            </div>
        </div>
    );
}

export default GustManagement;
