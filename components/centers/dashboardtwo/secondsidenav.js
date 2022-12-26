import Link from "next/link";

function Secondnav() {

    const path = window.location.pathname
    if (path == "/centers/studentlist" || path.includes("studentlist") || path == "/centers/register")
        return (<>
            <div className="secondNav">
                <ul>
                    <Link href={'/centers/register'}>
                        <li>
                            Add New Student
                        </li>
                    </Link>
                    <Link href={'/centers/studentlist'}>
                        <li>
                            All Students
                        </li>
                    </Link>
                </ul>
            </div>
        </>)
    if (path == "/centers/lecturers/register" || path == "/centers/lecturers")
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
    if (path == "/centers/courses/addcourses" || path == "/centers/courses")
        return (<>
            <div className="secondNav">
                <ul>
                    <Link href={'/centers/courses/addcourses'}>
                        <li>
                            Add Courses
                        </li>
                    </Link>
                    <Link href={'/centers/courses'}>
                        <li>
                            View all Courses
                        </li>
                    </Link>
                </ul>
            </div>
        </>)
    if (path == "/centers/faculties/addfaculty" || path == "/centers/faculties")
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
    if (path == "/centers/department/adddept" || path == "/centers/department")
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
    if (path == "/centers/launchprogram" || path == "/centers/launchprogram/launcedprogrammes")
        return (<>
            <div className="secondNav">
                <Link href={'/centers/launchprogram'}>
                    <li>
                        Launch Programme
                    </li>
                </Link>
                <Link href={'/centers/launchprogram/launcedprogrammes'}>
                    <li>
                        Programmes Launced
                    </li>
                </Link>
            </div>
        </>)
}
export default Secondnav;