import Link from "next/link";

function Secondnav() {
    return (<>
        <div className="secondNav">
            <div className="fw-bold">Students</div>
            <ul>

                <Link href={'/centers/dashboard'}>
                    <li>
                        Account
                    </li>
                </Link>
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
            <div className="fw-bold">Courses</div>
            <ul>
                <Link href={'/centers/register'}>
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
    </>);
}
export default Secondnav;