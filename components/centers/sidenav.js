// import styles from '/styles/sidenav.module.css'
import { Home, Key, NoteAddOutlined, Person2Outlined, PersonOffOutlined } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';


function Sidenav() {
    return (
        <div className="sidenavBody py-4 ps-4">
            <div className="text-center">
                <h5>SPESSE Dashboard</h5>
            </div>
            <div>
                <ul>
                    <li>
                        <Link href='/centers/dashboard'>
                            <span><HomeIcon /></span> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href='/centers/studentlist'><span><Home /></span>
                            Manage Students
                        </Link>
                    </li>
                    <li>
                        <Link href='/centers/studentlist'>
                            <span><NoteAddOutlined /></span>
                            Courses
                        </Link>

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