import Link from "next/link";

function Secondnav() {

    const path = window.location.pathname
    if (path.includes('institution') || path.includes("studentlist") || path.includes('register'))
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
                        <li>
                            Add New Lecturer
                        </li>
                    </Link>
                    <Link href={'/centers/lecturers'}>
                        <li>
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
                        <li>
                            Add Modules
                        </li>
                    </Link>
                    <Link href={'/centers/modules'}>
                        <li>
                            View all Modules
                        </li>
                    </Link>
                    <Link href={'/centers/attendance/allattendees'}>
                        <li>
                            View Module Attendees
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
                        <li>
                            Add Nodes
                        </li>
                    </Link>
                    <Link href={'/centers/node'}>
                        <li>
                            View all Nodes
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
                        <li>
                            Add Session
                        </li>
                    </Link>
                    <Link href={'/centers/session'}>
                        <li>
                            View all Session
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
                        <li>
                            Add Faculties
                        </li>
                    </Link>
                    <Link href={'/centers/faculties'}>
                        <li>
                            View all Faculties
                        </li>
                    </Link>
                </ul>
            </div>
        </>)
    if (path.includes("department") || path == "/centers/department")
        return (<>
            <div className="secondNav">
                <Link href={'/centers/department/adddept'}>
                    <li>
                        Add Department
                    </li>
                </Link>
                <Link href={'/centers/department'}>
                    <li>
                        View all Department
                    </li>
                </Link>
            </div>
        </>)
    if (path.includes("launchcourse"))
        return (<>
            <div className="secondNav">
                <Link href={'/centers/launchcourse'}>
                    <li>
                        Launch Course
                    </li>
                </Link>
                <Link href={'/centers/launchcourse/launchedcourses'}>
                    <li>
                        Courses Launched
                    </li>
                </Link>
            </div>
        </>)
}
export default Secondnav;