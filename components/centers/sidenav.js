// import styles from '/styles/sidenav.module.css'
import { Apartment, CalendarMonth, Home, HouseSiding, Key, LocationCityRounded, LocationDisabled, MapSharp, Monitor, NoteAddOutlined, PeopleOutlineOutlined, Person2Outlined, PersonOffOutlined, RocketLaunch, School, SettingsAccessibility } from '@mui/icons-material';
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
        manageDept: false,
        manageNode: false,
        manageSes: false,
    })

    return (
        <div className="sidenavBody py-4 ps-4">
            <div>
                <ul>
                    {/* DashBoard Link */}
                    <li>
                        <Link href='/centers/dashboard'>
                            <span><HomeIcon /></span> Dashboard
                        </Link>
                    </li>
                    {/* Manage Students link */}
                    <li onClick={(e) => setVisible(
                        { ...visible, manageStud: !visible.manageStud })} onMouseLeave={(e) => setVisible(
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
                    {/* Manage Lecturer Link */}
                    <li onClick={(e) => setVisible(
                        { ...visible, manageLect: !visible.manageLect })} onMouseLeave={(e) => setVisible(
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
                    {/* Manage Faculty Link */}
                    <li onClick={(e) => setVisible(
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
                    {/* Manage Department Link */}
                    <li onClick={(e) => setVisible(
                        { ...visible, manageDept: !visible.manageDept })} onMouseLeave={(e) => setVisible(
                            { ...visible, manageDept: false })}>


                        <span><HouseSiding /></span>
                        Manage Department
                        <div className={(visible.manageDept ? 'd-block' : 'd-none')}>
                            <ul className='sub-links'>
                                <li>
                                    <Link href="/centers/department">
                                        View All Department                                </Link>
                                </li>
                                <li>
                                    <Link href='/centers/department/adddept'>
                                        Add Department
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </li>
                    {/* Manage Modules link */}
                    <li onClick={(e) => setVisible(
                        { ...visible, manageCou: !visible.manageCou })} onMouseLeave={(e) => setVisible(
                            { ...visible, manageCou: false })}>
                        <span><NoteAddOutlined /></span>
                        Manage Modules
                        <div className={(visible.manageCou ? 'd-block' : 'd-none')}>
                            <ul className='sub-links'>
                                <li>
                                    <Link href='/centers/modules'>
                                        View All Modules
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/centers/modules/addmodules">
                                        Add Modules
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* Manage Nodes link */}
                    <li onClick={(e) => setVisible(
                        { ...visible, manageNode: !visible.manageNode })} onMouseLeave={(e) => setVisible(
                            { ...visible, manageNode: false })}>
                        <span><MapSharp /></span>
                        Manage Nodes
                        <div className={(visible.manageNode ? 'd-block' : 'd-none')}>
                            <ul className='sub-links'>
                                <li>
                                    <Link href='/centers/node'>
                                        View All Nodes
                                    </Link>

                                </li>
                                <li>
                                    <Link href="/centers/node/addNode">
                                        Add Node
                                    </Link>

                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* Manage Session link */}
                    <li onClick={(e) => setVisible(
                        { ...visible, manageSes: !visible.manageSes })} onMouseLeave={(e) => setVisible(
                            { ...visible, manageSes: false })}>
                        <span><CalendarMonth /></span>
                        Manage Session
                        <div className={(visible.manageSes ? 'd-block' : 'd-none')}>
                            <ul className='sub-links'>
                                <li>
                                    <Link href='/centers/session'>
                                        View All Sessions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/centers/session/addsession">
                                        Add Sessions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link href="/centers/launchcourse">
                            <span><RocketLaunch /></span>Launch Course
                        </Link>
                    </li>
                </ul>
            </div>

            <div >
                <ul>
                    <li>
                        Account Pages
                    </li>
                    <li>
                        <Link href={'/centers/profile'}>
                            <span><Person2Outlined /></span>Profile
                        </Link>
                    </li>

                    <li onClick={() => {
                        signOut({
                            redirect: false
                        })
                    }} >
                        <span><Key /></span>Sign Out
                    </li>

                </ul>
            </div>
        </div >
    )
}
export default Sidenav