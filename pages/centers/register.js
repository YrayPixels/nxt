import FirstsideNav from "../../components/centers/dashboardtwo/firstSidenav"
import Secondnav from "../../components/centers/dashboardtwo/secondsidenav"
import StudentRegistration from "../../components/centers/dashboardtwo/studentregform"

function RegisterStudents() {
    return <>
        <div className="container-fluid">

            <div>
                <div className="p-3">
                    for top nav
                </div>

            </div>
            <div className="row justify-content-center ">
                <div className="col-1 " >
                    <FirstsideNav />
                </div>
                <div className="col-2">
                    <Secondnav />
                </div>
                <div className="col-9 p-5 regMain">
                    <StudentRegistration />
                </div>
            </div>
        </div>
    </>
}

export default RegisterStudents