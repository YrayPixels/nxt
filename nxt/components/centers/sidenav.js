// import styles from '/styles/sidenav.module.css'


function Sidenav() {
    return (
        <div className="sidenavBody py-4 ps-4">
            <div className="text-center">
                <h5>SPESSE Dashboard</h5>
            </div>
            <div>
                <ul>
                    <li><span>
                        Dashboard
                    </span></li>
                    <li><span>
                        Manage Students
                    </span></li>
                    <li><span>
                        Courses
                    </span></li>

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
                        <span>Profile</span>
                    </li>
                    <li>
                        <span>Sign Out</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidenav