import FirstsideNav from "../../components/centers/dashboardtwo/firstSidenav"
import RegisteredStudents from "../../components/centers/dashboardtwo/registeredstudents"
import Secondnav from "../../components/centers/dashboardtwo/secondsidenav"
// import StudentRegistration from "../../components/centers/dashboardtwo/studentregform"

function Students() {
    return <>
        <div className="container-fluid">

            <div>
                <div className="p-3">
                    for top nav
                </div>

            </div>
            <div className="row justify-content-center ">
                <div className="col-1 border border-1 border-start  " >
                    <FirstsideNav />
                </div>
                <div className="col-2 border border-1 border-start">
                    <Secondnav />
                </div>
                <div className="col-9 p-5 regMain">
                    <RegisteredStudents />
                </div>
            </div>
        </div>
    </>
}

export default Students