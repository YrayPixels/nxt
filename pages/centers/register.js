import FirstsideNav from "../../components/centers/dashboardtwo/firstSidenav"
import Secondnav from "../../components/centers/dashboardtwo/secondsidenav"
import StudentRegistration from "../../components/centers/dashboardtwo/studentregform"

function RegisterStudents() {
    return <>
        <div>

            <div>
                for top nav
            </div>
            <div>
                <div>
                    <FirstsideNav />
                </div>
                <div>
                    <Secondnav />
                </div>
                <div>
                    <StudentRegistration />
                </div>
            </div>
        </div>
    </>
}

export default RegisterStudents