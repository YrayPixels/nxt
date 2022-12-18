// import styles from '/styles/sidenav.module.css'
import { Apartment, Home, Key, NoteAddOutlined, PeopleOutlineOutlined, Person2Outlined, PersonOffOutlined, School, SettingsAccessibility } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';


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
                        <Link href='/centers/studentlist'><span><PeopleOutlineOutlined /></span>
                            Manage Students
                        </Link>
                    </li>
                    <li>
                        <Link href='/centers/lecturers'>
                            <span><School /></span>
                            Manage Lecturers
                        </Link>

                    </li>
                    <li>
                        <Link href='/centers/faculties'>
                            <span><Apartment /></span>
                            Manage Faculty
                        </Link>

                    </li>
                    <li>
                        <Link href='/centers/courses'>
                            <span><NoteAddOutlined /></span>
                            Manage Courses
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
                    <li onClick={() => {
                        signOut()
                    }} >
                        <span><Key /></span>Sign Out
                    </li>

                </ul>
            </div>
        </div >
    )
}
export default Sidenav