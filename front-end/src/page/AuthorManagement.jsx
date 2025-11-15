import Sidebar from '../components/Sidebar/Sidebar.jsx';
import AuthorManagement from '../components/Author/Author.jsx';
import { Toaster } from "react-hot-toast";
import './font.css'


function GustManagement() {
    return (
        <div className="flex quicksand-uniquifier">
            <Toaster position="top-right" reverseOrder={false} />
            <Sidebar />
            <div className="flex-1">
                <AuthorManagement />
            </div>
        </div>
    );
}

export default GustManagement;
