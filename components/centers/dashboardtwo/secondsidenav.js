import Link from "next/link";

function Secondnav() {
    return (<>
        <div className="secondNav">
            <div className="fw-bold">New Students</div>
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

            </ul>
            <div className="fw-bold">Student Information</div>
            <ul>
                <Link href={'/centers/studentlist'}>
                    <li>
                        Student Details
                    </li>
                </Link>
            </ul>
        </div>
    </>);
}
export default Secondnav;