import Link from "next/link";

function Secondnav() {

    const path = window.location.pathname
    if (path.includes('institution') || path.includes("studentlist") || path == '/centers/register')
        return (<>
            <div className="secondNav">
                <ul>
                    <Link href={'/centers/register'}>
                        <li className={(path == '/centers/register' ? 'activated' : '')}>
                            Add Student
                        </li>
                    </Link>
                    <Link href={'/centers/studentlist'}>
                        <li className={(path.includes('studentlist') ? 'activated' : '')}>
                            All Students
                        </li>
                    </Link>
                    <Link href={'/centers/institution/add'}>
                        <li className={(path == '/centers/institution/add' ? 'activated' : '')}>
                            Add Institution
                        </li>
                    </Link>
                    <Link href={'/centers/institution'}>
                        <li className={(path == '/centers/institution' ? 'activated' : '')}>
                            View Institutions
                        </li>
                    </Link>
                </ul>
            </div>
        </>)
    if (path.includes("lecturers") || path == "/centers/lecturers")
        return (<>
            <div className="secondNav">
                <ul>
                    <Link href={'/centers/lecturers/register'}>
                        <li className={(path.includes('lecturers/register') ? 'activated' : '')}>
                            Add Lecturer
                        </li>
                    </Link>
                    <Link href={'/centers/lecturers'}>
                        <li className={(path == '/centers/lecturers' ? 'activated' : '')}>
                            All Lecturers
                        </li>
                    </Link>
                </ul>
            </div>
        </>)
    if (path.includes("modules") || path.includes('attendance'))
        return (<>
            <div className="secondNav">
                <ul>
                    <Link href={'/centers/modules/addmodules'}>
                        <li className={(path == '/centers/modules/addmodules' ? 'activated' : '')}>
                            Add Modules
                        </li>
                    </Link>
                    <Link href={'/centers/modules'}>
                        <li className={(path == '/centers/modules' ? 'activated' : '')}>
                            View Modules
                        </li>
                    </Link>
                    <Link href={'/centers/modules/startmodules'}>
                        <li className={(path == '/centers/modules/startmodules' ? 'activated' : '')}>
                            Start Modules
                        </li>
                    </Link>
                    <Link href={'/centers/attendance/addattendees'}>
                        <li className={(path == '/centers/attendance/addattendees' ? 'activated' : '')}>
                            Module Registration
                        </li>
                    </Link>
                    <Link href={'/centers/attendance/allattendees'}>
                        <li className={(path == '/centers/attendance/allattendees' ? 'activated' : '')}>
                            View Student Registered
                        </li>
                    </Link>
                </ul>
            </div>
        </>)
    if (path.includes("node"))
        return (<>
            <div className="secondNav">
                <ul>
                    <Link href={'/centers/node/addnode'}>
                        <li className={(path == '/centers/node/addnode' ? 'activated' : '')}>
                            Add Nodes
                        </li>
                    </Link>
                    <Link href={'/centers/node'}>
                        <li className={(path == '/centers/node' ? 'activated' : '')}>
                            View Nodes
                        </li>
                    </Link>
                </ul>
            </div>
        </>)
    if (path.includes("session"))
        return (<>
            <div className="secondNav">
                <ul>
                    <Link href={'/centers/session/addsession'}>
                        <li className={(path == '/centers/session/addsession' ? 'activated' : '')}>
                            Add Session
                        </li>
                    </Link>
                    <Link href={'/centers/session'}>
                        <li className={(path == '/centers/session' ? 'activated' : '')}>
                            View Session
                        </li>
                    </Link>
                </ul>
            </div>
        </>)
    if (path.includes("faculties") || path == "/centers/faculties")
        return (<>
            <div className="secondNav">
                <ul>
                    <Link href={'/centers/faculties/addfaculty'}>
                        <li className={(path == '/centers/faculties/addfaculty' ? 'activated' : '')}>
                            Add Faculties
                        </li>
                    </Link>
                    <Link href={'/centers/faculties'}>
                        <li className={(path == '/centers/faculties' ? 'activated' : '')}>
                            View Faculties
                        </li>
                    </Link>
                </ul>
            </div>
        </>)
    if (path.includes("department") || path == "/centers/department")
        return (<>
            <div className="secondNav">
                <Link href={'/centers/department/adddept'}>
                    <li className={(path == '/centers/department/adddept' ? 'activated' : '')}>
                        Add Department
                    </li>
                </Link>
                <Link href={'/centers/department'}>
                    <li className={(path == '/centers/department' ? 'activated' : '')}>
                        View Department
                    </li>
                </Link>
            </div>
        </>)
    if (path.includes("launchcourse"))
        return (<>
            <div className="secondNav">
                <Link href={'/centers/launchcourse'}>
                    <li className={(path == '/centers/launchcourse' ? 'activated' : '')}>
                        Launch Course
                    </li>
                </Link>
                <Link href={'/centers/launchcourse/launchedcourses'}>
                    <li className={(path == '/centers/launchcourse/launchedcourses' ? 'activated' : '')}>
                        Courses Launched
                    </li>
                </Link>
            </div>
        </>)
    if (path.includes('settings') || path.includes('graduatinglist') || path.includes('partners') || path.includes('profile') || path.includes('users'))
        return (<>
            <div className="secondNav pb-3">
                <Link href={'/centers/graduatinglist/create'}>
                    <li className={(path == '/centers/graduatinglist/create' ? 'activated' : '')}>
                        Create Graduating List
                    </li>
                </Link>
                <Link href={'/centers/graduatinglist/all'}>
                    <li className={(path == '/centers/graduatinglist/all' ? 'activated' : '')}>
                        View Graduating List
                    </li>
                </Link>
                <Link href={'/centers/graduatinglist/addstudents'}>
                    <li className={(path == '/centers/graduatinglist/addstudents' ? 'activated' : '')}>
                        Add Student to Graduating List
                    </li>
                </Link>
                <Link href={'/centers/partners/add'}>
                    <li className={(path == '/centers/partners/add' ? 'activated' : '')}>
                        Add Academic Partners
                    </li>
                </Link>
                <Link href={'/centers/partners'}>
                    <li className={(path == '/centers/partners' ? 'activated' : '')}>
                        View All Academic Partners
                    </li>
                </Link>
                <Link href={'/centers/users/addUser'}>
                    <li className={(path == '/centers/users/addUser' ? 'activated' : '')}>
                        Add Users
                    </li>
                </Link>
                <Link href={'/centers/users/all'}>
                    <li className={(path == '/centers/users/all' ? 'activated' : '')}>
                        View Users
                    </li>
                </Link>
                <Link href={'/centers/profile'}>
                    <li className={(path == '/centers/profile/edit' ? 'activated' : '')}>
                        Edit Profile
                    </li>
                </Link>
                <Link href={'/centers/profile/password'}>
                    <li className={(path == '/centers/profile/password' ? 'activated' : '')}>
                        Change Password
                    </li>
                </Link>
            </div>
        </>)
}
export default Secondnav;