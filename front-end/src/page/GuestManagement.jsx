import Sidebar from '../components/Sidebar/Sidebar.jsx';
import UserManagement from '../components/UserList/UserList.jsx';
import { Toaster } from "react-hot-toast";
import './font.css'


function GeustManagement() {
    return (
        <div className="flex quicksand-uniquifier">
            <Toaster position="top-right" reverseOrder={false} />
            <div className='sticky top-0 h-screen z-50'>
                <Sidebar />
            </div>
            <div className="flex-1">
                <UserManagement />
            </div>
        </div>
    );
}

export default GeustManagement;
