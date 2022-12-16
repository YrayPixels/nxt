// import styles from '/styles/sidenav.module.css'
import { Home, Key, NoteAddOutlined, Person2Outlined, PersonOffOutlined } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';


function Sidenav() {
    return (
        <div className="sidenavBody py-4 ps-4">
            <div className="text-center">
                <h5>SPESSE Dashboard</h5>
            </div>
            <div>
                <ul>
                    <li>
                        <span><HomeIcon /></span> Dashboard
                    </li>
                    <li> <span><Home /></span>
                        Manage Students
                    </li>
                    <li><span><NoteAddOutlined /></span>
                        Courses
                    </li>

                </ul>
            </div>
            <div className="text-center">
                <h6>
                    Account Pages
                </h6>
            </div>
            <div >
                <ul>
                    <li>
                        <span><Person2Outlined /></span>Profile
                    </li>
                    <li>
                        <span><Key /></span>Sign Out
                    </li>
                </ul>
            </div>
        </div >
    )
}
export default Sidenav