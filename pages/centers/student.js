import FirstsideNav from "../../components/centers/dashboardtwo/firstSidenav"
import Secondnav from "../../components/centers/dashboardtwo/secondsidenav"
import StudentDetails from "../../components/centers/dashboardtwo/studentdetails"


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
                    <StudentDetails />
                </div>
            </div>
        </div>
    </>
}

export default Students