// import styles from '/styles/sidenav.module.css'
import { Apartment, Home, Key, Monitor, NoteAddOutlined, PeopleOutlineOutlined, Person2Outlined, PersonOffOutlined, RocketLaunch, School, SettingsAccessibility } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';


function Sidenav() {
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
                    <li>
                        <CDropdown variant="btn-group" direction="dropend">
                            <CDropdownToggle color="none"><span><PeopleOutlineOutlined /></span>
                                Manage Students</CDropdownToggle>
                            <CDropdownMenu  >
                                <Link href="/centers/studentlist">
                                    <CDropdownItem >View All Students</CDropdownItem>
                                </Link>
                                <Link href="/centers/register">
                                    <CDropdownItem >Add Student</CDropdownItem>
                                </Link>
                            </CDropdownMenu>
                        </CDropdown>

                    </li>
                    <li>
                        <CDropdown variant="btn-group" direction="dropend">
                            <CDropdownToggle color="none"><span><School /></span>
                                Manage Lecturers</CDropdownToggle>
                            <CDropdownMenu  >
                                <Link href="/centers/lecturers/register">
                                    <CDropdownItem >View All Lecturers</CDropdownItem>
                                </Link>
                                <Link href="/centers/lecturers">
                                    <CDropdownItem>Add Lecturer</CDropdownItem>
                                </Link>
                            </CDropdownMenu>
                        </CDropdown>
                    </li>
                    <li>
                        <CDropdown variant="btn-group" direction="dropend">
                            <CDropdownToggle color="none"><span><Apartment /></span>
                                Manage Faculty</CDropdownToggle>
                            <CDropdownMenu  >
                                <Link href="/centers/lecturers/addfaculty">
                                    <CDropdownItem >View All Faculties</CDropdownItem>
                                </Link>
                                <Link href='/centers/faculties'>
                                    <CDropdownItem>Add Faculty</CDropdownItem>
                                </Link>
                            </CDropdownMenu>
                        </CDropdown>
                    </li>
                    <li>
                        <Link href='/centers/faculties'>
                            <CDropdown variant="btn-group" direction="dropend">
                                <CDropdownToggle color="none"> <span><NoteAddOutlined /></span>
                                    Manage Courses</CDropdownToggle>
                                <CDropdownMenu  >
                                    <Link href='/centers/courses'>
                                        <CDropdownItem >View All Courses</CDropdownItem>
                                    </Link>
                                    <Link href="/centers/lecturers/addcourses">
                                        <CDropdownItem>Add Course</CDropdownItem>
                                    </Link>
                                </CDropdownMenu>
                            </CDropdown>

                        </Link>


                    </li>
                    <li>
                        <Link href="/centers/lecturers/addcourses">
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