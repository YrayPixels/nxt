// import styles from '/styles/sidenav.module.css'
import { Apartment, Home, Key, Monitor, NoteAddOutlined, PeopleOutlineOutlined, Person2Outlined, PersonOffOutlined, RocketLaunch, School, SettingsAccessibility } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { useState } from 'react';


function Sidenav() {
    // const [visible, setVisible] = useState(false);
    const [visible, setVisible] = useState({
        manageStud: false,
        manageLect: false,
        manageFac: false,
        manageCou: false,
        LauncPro: false,
    })

    return (
        <div className="sidenavBody py-4 ps-4">
            <div className="text-center d-flex fw-bold">
                <p>
                    <Monitor />
                </p>
                <p>
                    SPESSE Dashboard
                </p>
            </div>
            <div>
                <ul>
                    <li>
                        <Link href='/centers/dashboard'>
                            <span><HomeIcon /></span> Dashboard
                        </Link>
                    </li>
                    <li onMouseEnter={(e) => setVisible(
                        { ...visible, manageStud: true })} onMouseLeave={(e) => setVisible(
                            { ...visible, manageStud: false })}>
                        <span><PeopleOutlineOutlined /></span>
                        Manage Students
                        <div className={(visible.manageStud ? 'd-block' : 'd-none')}>
                            <ul className='sub-links'>
                                <li>
                                    <Link href="/centers/studentlist">
                                        View All Students
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/centers/register">
                                        Add Student
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li onMouseEnter={(e) => setVisible(
                        { ...visible, manageLect: true })} onMouseLeave={(e) => setVisible(
                            { ...visible, manageLect: false })}>
                        <span><School /></span>
                        Manage Lecturers
                        <div className={(visible.manageLect ? 'd-block' : 'd-none')}>
                            <ul className='sub-links'>
                                <li>
                                    <Link href="/centers/lecturers/register">
                                        View All Lecturers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/centers/lecturers">
                                        Add Lecturer
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li onMouseEnter={(e) => setVisible(
                        { ...visible, manageFac: true })} onMouseLeave={(e) => setVisible(
                            { ...visible, manageFac: false })}>
                        <Link href='/centers/faculties'>

                            <span><Apartment /></span>
                            Manage Faculty
                            <div className={(visible.manageFac ? 'd-block' : 'd-none')}>
                                <ul className='sub-links'>
                                    <li>
                                        <Link href="/centers/faculties">
                                            View All Faculties                                </Link>
                                    </li>
                                    <li>
                                        <Link href='/centers/faculties/addfaculty'>
                                            Add Faculty
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    </li>
                    <li onMouseEnter={(e) => setVisible(
                        { ...visible, manageCou: true })} onMouseLeave={(e) => setVisible(
                            { ...visible, manageCou: false })}>
                        <Link href='/centers/faculties'>

                            <span><NoteAddOutlined /></span>
                            Manage Courses
                            <div className={(visible.manageCou ? 'd-block' : 'd-none')}>
                                <ul className='sub-links'>
                                    <li>
                                        <Link href='/centers/courses'>
                                            View All Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/centers/lecturers/addcourses">
                                            Add Course
                                        </Link>
                                    </li>
                                </ul>
                            </div>



                        </Link>
                    </li>
                    <li>
                        <Link href="/centers/launchprogram">
                            <span><RocketLaunch /></span>Launch Programme
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